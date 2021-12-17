defmodule MakotoWeb.UserRegistrationController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  alias Makoto.Accounts.User
  alias MakotoWeb.UserAuth
  require Logger
  def new(conn, _params) do
    Logger.info(inspect(get_session(conn)))
    changeset = Accounts.change_user_registration(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    Logger.info inspect(get_session(conn))
    case Accounts.register_user(user_params, get_session(conn)) do
      {:ok, user} ->
        Task.start(fn ->
          Accounts.deliver_user_confirmation_instructions(
            user,
            &Routes.user_confirmation_url(conn, :edit, &1)
          ) end)

        conn
        |> put_flash(:info, "User created successfully.")
        |> assign(:static_url, conn.request_path)
        |> UserAuth.log_in_user(user)

      {:error, %Ecto.Changeset{errors: errors} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end