defmodule MakotoWeb.UserSessionController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  alias MakotoWeb.UserAuth
  alias Ueberauth.Strategy.Helpers

  plug Ueberauth

  require Logger

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: %Ueberauth.Auth{extra: %Ueberauth.Auth.Extra{raw_info: %{user: user}}}, current_user: ecto_user}} = conn, _params) do
    user =
      user
      |> Kernel.then(fn user ->
        %{discord_id: user["id"], username: user["username"]}
      end)

    Accounts.assoc_discord_user(ecto_user, user)

    conn
    |> redirect(to: "/user/#{ecto_user.username}")
  end

  def new(conn, _params) do
    render(conn, "new.html", error_message: nil)
  end

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      UserAuth.log_in_user(conn, user, user_params)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      render(conn, "new.html", error_message: "Invalid email or password")
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end
end
