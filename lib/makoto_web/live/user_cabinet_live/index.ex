defmodule MakotoWeb.UserCabinetLive.Index do
  use MakotoWeb, :live_view

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def mount(params, %{"user_token" => user_token} = session, socket) do
    user =
      Accounts.get_user_by_session_token(user_token)
      |> Accounts.preload([:discord_info])

    refs =
      Accounts.get_all_referrals(user.id)

    {:ok, socket |> assign(:user, user) |> assign(:refs, refs) |> assign(:host, get_connect_params(socket)["host"])}
  end

  def mount(params, session, socket) do
    {:ok, socket |> assign(:user, nil)}
  end

  @impl true
  def handle_params(params, _url, socket) do
    Logger.info socket.assigns.live_action
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, action, %{"username" => username}) when action in [:up_balance] do
     socket
  end

  # TODO нужно сделать систему посещения профиля другим игроков
  defp apply_action(socket, action, %{"username" => username}) when action in [:index] do
    socket
 end

  defp apply_action(socket, :delete, %{"username" => username}) do
    socket.assigns.user
    |> Accounts.delete_discord()

    socket
    |> push_redirect(to: Routes.user_cabinet_index_path(socket, :index, username))
  end

  defp apply_action(socket, action, _params) do
    Logger.info action
     socket
  end

  defp apply_action(socket, :update_email, %{"token" => token}) do
    case Accounts.update_user_email(socket.assigns.user, token) do
      :ok ->
        socket
        |> put_flash(:info, "Email changed successfully.")
        |> redirect(to: Routes.user_settings_path(socket, :edit))

      :error ->
        socket
        |> put_flash(:error, "Email change link is invalid or it has expired.")
        |> redirect(to: Routes.user_settings_path(socket, :edit))
    end
  end
end
