defmodule MakotoWeb.UserGameController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params = %{"username" => username}) do
    case Makoto.Accounts.get_user_by_username(username) do
      nil ->
        text(
            conn
            |> put_resp_header("content-type", "application/json"),
            response
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

  defp remove_unnecessary_fields(user) do
    user
    |> Map.take([:username, :rubins, :avatar_url, :role, :privilege_disable_time])
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
