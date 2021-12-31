defmodule MakotoWeb.UserDiscordController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params = %{"discord_id" => discord_id}) do
    case Makoto.Accounts.get_user_discord_info_by_id(discord_id) do
      nil ->
        text(
            conn
            |> put_resp_header("content-type", "application/json"),
            response
            |> Poison.encode!
          )

      user ->
        user = user |> Makoto.Repo.preload([:user]) |> Map.get(:user)
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

  defp remove_unnecessary_fields(user) do
    discord_info = user.discord_info || %{discord_id: nil}

    user
    |> Map.take([:username, :rubins, :avatar_url, :role, :privilege_disable_time])
    |> Map.merge(Map.take(discord_info, [:discord_id]))
  end

  defp response(user) do
    %{
      "success": true,
      "user": user
    }
  end

  defp response() do
    %{
      "success": false,
      "user": nil
    }
  end
end
