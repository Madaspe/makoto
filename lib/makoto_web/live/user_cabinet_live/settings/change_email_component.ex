defmodule MakotoWeb.UserCabinetLive.ChangeEmailComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    user =
      Accounts.get_user_by_username!(assigns.username)

    {:ok, socket |> assign(assigns)}
  end


  @impl true
  def handle_event("submit", %{"user" => %{"password" => password, "email" => email}}, socket) do
    user = socket.assigns.user

    case Accounts.apply_user_email(user, password, %{email: email}) do
      {:ok, applied_user} ->
        Accounts.deliver_update_email_instructions(
          applied_user,
          user.email,
          &Routes.user_settings_url(socket, :confirm_email, &1)
        )

        {:noreply, socket
        |> put_flash(
          :info,
          "Ссылка для подтверждения отправленна вам на почту"
        )}


      {:error, changeset} ->
        {:noreply, socket}
    end
  end

  @impl true # TODO Нужно сделать валидацию
  def handle_event("validate", params, socket) do
    {:noreply, socket}
  end
end
