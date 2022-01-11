defmodule MakotoWeb.UserCabinetLive.Index do

  use MakotoWeb, :live_view

  alias Makoto.Accounts
  alias Makoto.Accounts.User
  alias Phoenix.PubSub
  alias MakotoMinecraft.Minecraft
  require Logger

  @impl true
  def mount(params, %{"user_token" => user_token} = session, socket) do
    PubSub.subscribe Makoto.PubSub, "servers"

    user =
      Accounts.get_user_by_session_token(user_token)
      |> Accounts.preload([:discord_info, :roles])
    refs =
      Accounts.get_all_referrals(user.id)

    {love_server, online} =
      Minecraft.get_online(user.username)
      |> Enum.group_by(fn x -> x.server end)
      |> Enum.map(fn x ->
         {server, info} = x
         {server, info |> Enum.reduce(0, fn (x, acc) -> x.online + acc end)}
      end)
      |> Enum.max_by(fn x ->
        {server, online} = x

        online
      end, fn -> {"Нет", 0} end)

    servers =
      Minecraft.get_servers_info_from_cache()

      {:ok, socket
      |> assign(:user, user)
      |> assign(:refs, refs)
      |> assign(:host, get_connect_params(socket)["host"])
      |> assign(:online, online)
      |> assign(:love_server, love_server)
      |> assign(:status_name, status_name(user.roles))
      |> assign(:type_of_settings, params["type_of_settings"])
      |> assign(:servers, servers)}
  end

  def mount(params, session, socket) do
    {:ok, socket |> assign(:user, nil)}
  end

  def handle_info(servers, socket) do
    {:noreply, socket |> assign(:servers, servers)}
  end

  @impl true
  def handle_params(params, _url, socket) do
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
     socket
  end

  defp apply_action(socket, :update_email, %{"token" => token}) do
    case Accounts.update_user_email(socket.assigns.user, token) do
      :ok ->
        socket
        |> put_flash(:info, "Успешно")
        |> redirect(to: Routes.user_settings_path(socket, :edit))

      :error ->
        socket
        |> put_flash(:error, "Действие ссылки закончилось")
        |> redirect(to: Routes.user_settings_path(socket, :edit))
    end
  end

  defp status_name(roles) do
    status_names =
      Application.get_env(:makoto, :status_name)

    cond do
      roles == [] ->
        status_names
        |> Map.get("user")
      true ->
        status_names
        |> Map.get(List.last(roles).name) || List.last(roles).name
    end
  end
end
