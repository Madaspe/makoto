defmodule MakotoWeb.UserCabinetLive.ChangePasswordComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User
  alias MakotoXenForo.XenForo
  require Logger

  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns)}
  end

  @impl true
  def handle_event("submit", %{"user" => %{"current_password" => current_password, "new_password" => new_password}}, socket) do
     user = socket.assigns.user

     case Accounts.update_user_password(user, current_password, %{password: new_password}) do
       {:ok, user} ->
        XenForo.update_user_by_username(user.username, %{password: new_password})
        {:noreply, socket
         |> put_flash(:info, "Пароль обновлен")
         }

       {:error, changeset} ->
         {:noreply, socket
         |> put_flash(:info, "Error")
         }
     end
  end

  @impl true # TODO Нужно сделать валидацию пароля в смене пароля личного кабинета
  def handle_event("validate", %{"user" => %{"current_password" => current_password, "new_password" => new_password}}, socket) do
     {:noreply, socket}
  end

end
