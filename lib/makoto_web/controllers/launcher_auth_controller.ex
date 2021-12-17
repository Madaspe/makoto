defmodule MakotoWeb.LauncherAuthController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params = %{"password" => password, "username" => username}) do
    if user = Makoto.Accounts.get_user_by_username_and_password(username, password) do
      text(conn, "OK:#{user.username}")
    else
      text(conn, "Неверный логин или пароль")
    end
  end
end
