defmodule MakotoWeb.UserSessionController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  alias MakotoWeb.UserAuth
  alias MakotoXenForo.XenForo
  plug Ueberauth

  require Logger

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Не удалось авторизоватся")
    |> redirect(to: "/")
  end
  def callback(%{assigns: %{ueberauth_auth: %Ueberauth.Auth{extra: %Ueberauth.Auth.Extra{raw_info: %{user: user}}}, current_user: ecto_user}} = conn, _params) do
    user =
      user
      |> Kernel.then(fn user ->
        %{discord_id: user["id"], username: user["username"]}
      end)

    Accounts.assoc_discord_user(ecto_user, user)
    inviter_id = case Accounts.get_discord_invited_by_id(user.discord_id) do
      nil ->
        nil
      user_discord_info ->
        user_discord_info
        |> Map.get(:inviter_id)
    end

    case inviter_id do
      nil -> nil
      id ->
        case Accounts.get_user_discord_info_by_id(id) do
          nil -> nil
          user ->
            user
            |> Makoto.Repo.preload([:user])
            |> Map.get(:user)
            |> Kernel.then(fn user ->
              Accounts.update_user(ecto_user, %{inviter_id: user.id})
            end)
        end
    end
    conn
    |> redirect(to: "/user/#{ecto_user.username}")

  end

  def new(conn, _params) do
    render(conn, "new.html", error_message: nil)
  end

  def create(conn, %{"user" => user_params}) do
    %{"username" => username, "password" => password} = user_params

    if user = Accounts.get_user_by_username_and_password(username, password) do
      register_forum_account(%{username: username, password: password, email: user.email, avatar_url: user.avatar_url})
      UserAuth.log_in_user(conn, user, user_params)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      render(conn, "new.html", error_message: "Invalid username or password")
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end

  def lk(conn, _params) do
    user =
      conn.assigns.current_user

    if user do
      redirect(conn, to: Routes.user_cabinet_index_path(conn, :index, user.username))
    else
      render(conn, "new.html", error_message: "")
    end
  end

  def forum(conn, _params) do
    user =
      conn.assigns.current_user

    if user do
      redirect(conn, external: XenForo.auth_forum_by_username(user.username, %{})["login_url"])
    else
      redirect(conn, external: "https://forum.optimine.su")
    end
  end

  def register_forum_account(user) do
    forum_user = XenForo.find_forum_user_by_username(user.username)["exact"]
    if forum_user == nil do
      user |> register_forum
    else
      :ok
    end
  end

  defp register_forum(user) do
    forum_user =
      XenForo.create_forum_user(user)

    if user.avatar_url != nil do
      XenForo.update_forum_avatar(forum_user, user)
    end
  end
end
