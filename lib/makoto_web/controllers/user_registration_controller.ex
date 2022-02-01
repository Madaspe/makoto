defmodule MakotoWeb.UserRegistrationController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  alias Makoto.Accounts.User
  alias MakotoWeb.UserAuth
  require Logger

  def new(conn, _params) do
    changeset = Accounts.change_user_registration(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params, "g-recaptcha-response" => recaptcha_response}) do
    case GoogleRecaptcha.valid?(recaptcha_response) do
      true ->
        create(conn, %{"user" => user_params})

      false ->
        changeset = User.registration_changeset(%User{}, user_params)
        render(conn, "new.html", changeset: changeset)
    end
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params, Map.merge(get_session(conn), user_params)) do
      {:ok, user} ->
        MakotoXenForo.XenForo.create_forum_user(user)
        user = Map.drop(user, [:password])

        Task.start(fn ->
          Accounts.deliver_user_confirmation_instructions(
            user,
            &Routes.user_confirmation_url(conn, :edit, &1)
          )
        end)

        conn
        |> put_flash(:info, "Регистрация успешна")
        |> assign(:static_url, conn.request_path)
        |> UserAuth.log_in_user(user)

      {:error, %Ecto.Changeset{errors: errors} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
