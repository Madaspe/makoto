defmodule MakotoWeb.UserCabinetLive.UpBalanceComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(assigns)
    {:ok, socket |> assign(assigns)}
  end

  @impl true
  def handle_params(%{"username" => username}, _, socket) do
    user =
      Accounts.get_user_by_username!(username)

    {:noreply,
     socket
     |> assign(:user, user)
     |> assign(:changeset, User.balance_changeset(user))}
  end

  def handle_event("submit", %{"user" => %{"rubins" => rubins}} = unsigned_params, socket) do
    {:noreply, socket
    |> put_flash(:info, "balance has been successfully replenished with #{rubins} rubies")
    |> push_redirect(to: socket.assigns.return_to)}
  end
end
