defmodule MakotoMinecraft.Minecraft do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias MakotoMinecraft.MinecraftRepo
  alias MakotoMinecraft.Minecraft
  alias Makoto.Repo
  require Logger

  def get_online(username), do: Minecraft.Info |> where(player: ^username) |> MinecraftRepo.all()
  def get_servers(), do: Minecraft.ServerInfo |> Repo.all()

  def get_servers_info(), do: get_servers() |> Enum.map(fn server -> get_server_info(server) end)
  def get_server_info(server) do
    case MinecraftPing.get_info(server.server_ip, server.server_port) do
      {:ok, response} ->
        server
        |> Map.put(:status, True)
        |> Map.put(:info, response)
      _ ->
        server
        |> Map.put(:status, False)
    end
  end

  def cache_servers_info() do
    Cachex.clear(:minecraft_server_cache)

    get_servers_info()
    |> Enum.map(fn server ->
      Cachex.put!(:minecraft_server_cache, server.server_name, server)
    end)

  end

  def get_server_from_cache(server_name), do: Cachex.get(:minecraft_server_cache, server_name)

  def get_servers_info_from_cache() do
    get_servers() |> Enum.map(fn server -> %{server: server, info: get_server_from_cache(server.server_name)} end)
   end
end

defmodule MinecraftPing do
  require Jason
  use Bitwise

  @mc_protocol_version 340

  defp pack_varint(num) do
    pack_varint(num, <<>>)
  end

  defp pack_varint(num, buf) do
    b = num &&& 0x7F
    d = num >>> 7

    cond do
      d > 0 ->
        pack_varint(d, buf <> <<bor(b, 0x80)>>)

      d == 0 ->
        buf <> <<b>>
    end
  end

  defp pack_port(port) do
    <<port::size(16)>>
  end

  defp pack_data(str) do
    pack_varint(byte_size(str)) <> str
  end

  defp construct_handshake_packet(address, port) do
    pack_varint(0) <>
      pack_varint(@mc_protocol_version) <> pack_data(address) <> pack_port(port) <> pack_varint(1)
  end

  defp unpack_varint(conn, timeout) do
    unpack_varint(conn, 0, 0, timeout)
  end

  defp unpack_varint(conn, d, n, timeout) do
    read = :gen_tcp.recv(conn, 1, timeout)
    case read do
      {:ok, read} ->
        b = :binary.at(read, 0)
        a = bor(d, (b &&& 0x7F) <<< (7 * n))
        cond do
          (b &&& 0x80) == 0 ->
            {:ok, a}
          n > 4 ->
            raise("suspicious varint size (tried to read more than 5 bytes)")
          true ->
            unpack_varint(conn, a, n + 1, timeout)
        end
      error ->
        error
    end
  end

  def get_info(address, port \\ 25565, timeout \\ 3000) do
    address_chars = to_charlist(address)
    result = :gen_tcp.connect(address_chars, port, [:binary, active: false], timeout)
    case result do
      {:ok, conn} ->
        try do
          handshake = construct_handshake_packet(address, port) |> pack_data
          :ok = :gen_tcp.send(conn, handshake)
          :ok = :gen_tcp.send(conn, pack_data(<<0>>))
          case unpack_varint(conn, timeout) do
            {:ok, _} ->
              {:ok, _} = unpack_varint(conn, timeout)
              {:ok, json_size} = unpack_varint(conn, timeout)
              {:ok, json_packet} = :gen_tcp.recv(conn, json_size, timeout)
              decoded = :erlang.iolist_to_binary(json_packet) |> Jason.decode!()
              {:ok, decoded}
            {:error, error} ->
              {:error, error}
          end
        after
          :gen_tcp.close(conn)
        end
      error ->
        error
    end
  end
end
