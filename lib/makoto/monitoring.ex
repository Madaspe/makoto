defmodule Makoto.Monitoring do
  use GenServer

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(_) do
    :timer.send_interval(60000, :update)
    {:ok, %{}}
  end

  def handle_info(:update, state) do
    servers =
      MakotoMinecraft.Minecraft.cache_servers_info()
    Phoenix.PubSub.broadcast Makoto.PubSub, "servers", MakotoMinecraft.Minecraft.get_servers_info_from_cache()
    {:noreply, %{}}
  end
end
