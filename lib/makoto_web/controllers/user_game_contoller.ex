defmodule MakotoWeb.UserGameController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  require Logger
  def index(conn, _params = %{"username" => username}) do
    case Makoto.Accounts.get_user_by_username(username) |> Makoto.Repo.preload([:discord_info, :roles]) do
      nil ->
        text(
            conn
            |> put_resp_header("content-type", "application/json"),

            response()
            |> Poison.encode!
          )

      user ->
        text(
            conn
            |> put_resp_header("content-type", "application/json"),

            user
            |> remove_unnecessary_fields
            |> response
            |> Poison.encode!
          )
    end
  end

  def change_user(conn, params = %{"username" => username}) do
    # cond do
    #   Map.has_key?(params, "rubins") -> change_rubins(username, params["rubins"])
    #   Map.has_key?(params, "discord_id") -> change_discord_id(username, params["discord_id"])
    #   Map.has_key?(params, "prefix") -> change_prefix(username, params["prefix"])
    #   Map.has_key?(params, "roles") -> change_roles(username, params["roles"])
    # end
  end

  defp remove_unnecessary_fields(user) do
    discord_info = user.discord_info || %{discord_id: nil}
    roles =
      user.roles
      |> Enum.map(fn role -> Map.take(role, [:name, :server, :privilege_disable_time]) end)
    user
    |> Map.take([:username, :rubins, :avatar_url, :count_voting, :prefix])
    |> Map.put(:roles, roles)
    |> Map.merge(Map.take(discord_info, [:discord_id]))
  end

  defp response(user) do
    %{
      "success" => true,
      "user" => user
    }
  end

  defp response() do
    %{
      "success" => false,
      "user" => nil
    }
  end
end
