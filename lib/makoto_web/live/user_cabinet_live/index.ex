defmodule MakotoWeb.UserCabinetLive.Index do
  use MakotoWeb, :live_view

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def mount(params, %{"user_token" => user_token} = session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, action, %{"username" => username}) when action in [:up_balance, :index] do
    user = Accounts.get_user_by_username!(username)

     socket
     |> assign(:user, user)
  end

  # defp apply_action(socket, :up_balance, params) do
  #   Logger.info inspect(params)

  #   socket
  #   |> assign(:user, params)
  # end
end
