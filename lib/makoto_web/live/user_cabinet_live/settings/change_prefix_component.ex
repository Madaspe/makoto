defmodule MakotoWeb.UserCabinetLive.ChangePrefixComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns)}
  end

  @impl true
  def handle_event("submit", %{"user" => %{"current_password" => current_password, "new_password" => new_password}}, socket) do

  end

  @impl true # TODO Нужно сделать валидацию пароля в смене пароля личного кабинета
  def handle_event("validate", %{"user" => %{"current_password" => current_password, "new_password" => new_password}}, socket) do
     {:noreply, socket}
  end

end
