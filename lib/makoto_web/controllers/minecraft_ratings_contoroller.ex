defmodule MakotoWeb.MinecraftRatingsController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  require Logger
  def index(conn, _params = %{"signature" => valid_signature, "username" => username, "timestamp" => timestamp, "rating" => rating}) when rating == "topcraft" do
    signature =
      :crypto.hash(:sha, "#{username}#{timestamp}#{Application.get_env(:makoto, :topcraft_voting_token)}")
      |> Base.encode16()
    if String.downcase(signature) == String.downcase(valid_signature) do
      up_rating_by_username(username)
      text(conn, "ok")
    else
      text(conn, "FAIL")
    end
  end

  def index(conn, _params = %{"signature" => valid_signature, "username" => username, "timestamp" => timestamp, "rating" => rating})  when rating == "minecraftrating" do
    signature =
      :crypto.hash(:sha, "#{username}#{timestamp}")
      |> Base.encode16()
    if String.downcase(signature) == String.downcase(valid_signature) do
      up_rating_by_username(username)
      text(conn, "ok")
    else
      text(conn, "FAIL")
    end
  end

  def index(conn, _params = %{"token" => valid_signature, "nickname" => username, "rating" => rating})  when rating == "mctop" do
    signature =
      :crypto.hash(:md5, "#{username}#{Application.get_env(:makoto, :mctop_voting_token)}")
      |> Base.encode16()
    if String.downcase(signature) == String.downcase(valid_signature) do
      up_rating_by_username(username)
      text(conn, "ok")
    else
      text(conn, "FAIL")
    end
  end

  def index(conn, _params = %{"hash" => valid_signature, "nick" => username, "rating" => rating})  when rating == "mcrate" do
    signature =
      :crypto.hash(:md5, "#{username}TOKENmcrate")
      |> Base.encode16()
      |> String.downcase()
    signature =
      :crypto.hash(:md5, signature)
      |> Base.encode16()

    if String.downcase(signature) == String.downcase(valid_signature) do
      up_rating_by_username(username)
      text(conn, "ok")
    else
      text(conn, "FAIL")
    end
  end

  defp up_rating_by_username(username) do
    case Accounts.get_user_by_username(username) do
      nil ->
        nil
      user ->
        Accounts.update_user(user, %{count_voting: user.count_voting + 1})
    end
  end
end
