defmodule MakotoWeb.UserCabinetLive.Index do
  use MakotoWeb, :live_view

  alias Makoto.Accounts
  alias Phoenix.PubSub
  alias MakotoMinecraft.Minecraft
  require Logger

  @impl true
  def mount(params, %{"user_token" => user_token} = _session, socket) do
    PubSub.subscribe(Makoto.PubSub, "servers")

    user =
      Accounts.get_user_by_session_token(user_token)
      |> Accounts.preload([:discord_info, :roles])

    mount(params, user, socket)
  end

  def mount(params, %Makoto.Accounts.User{} = user, socket) do
    refs = Accounts.get_all_referrals(user.id)

    servers_with_online =
      MakotoMinecraft.Minecraft.get_online(user.username)
      |> Enum.group_by(fn x -> x.server end)
      |> Enum.map(fn x ->
        {server, info} = x
        {server, info |> Enum.reduce(0, fn x, acc -> x.online + acc end)}
      end)

    {love_server, _} =
      servers_with_online
      |> Enum.max_by(
        fn x ->
          {_server, online} = x
          online
        end,
        fn -> {"Нет", 0} end
      )

    online =
      servers_with_online
      |> Enum.map(fn x ->
        {_, server_online} = x

        server_online
      end)
      |> Enum.sum()

    servers = Minecraft.get_servers_info_from_cache()

    {:ok,
     socket
     |> assign(:user, user)
     |> assign(:refs, refs)
     |> assign(:host, get_connect_params(socket)["host"])
     |> assign(:online, online)
     |> assign(:love_server, love_server)
     |> assign(:status_name, status_name(user.roles))
     |> assign(:type_of_settings, params["type_of_settings"])
     |> assign(:servers, servers)
     |> assign(:params, params)
     |> push_event("test", %{})}
  end

  def mount(_params, _session, socket) do
    servers = Minecraft.get_servers_info_from_cache()

    {:ok, socket |> assign(:user, nil) |> assign(:servers, servers)}
  end

  @impl true
  def handle_info(servers, socket) do
    {:noreply, socket |> assign(:servers, servers)}
  end

  @impl true
  def handle_event("change-live", %{"new_live" => new_live}, socket) do
    {:noreply, socket |> assign(:live_action, String.to_atom(new_live))}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, action, %{"username" => _username}) when action in [:up_balance] do
    socket
  end

  defp apply_action(socket, :delete, %{"username" => _username}) do
    socket.assigns.user
    |> Accounts.delete_discord()

    socket
    |> push_redirect(
      to: Routes.user_cabinet_index_path(socket, :index, socket.assigns.user.username)
    )
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

  # TODO нужно сделать систему посещения профиля другим игроков
  defp apply_action(socket, action, %{"username" => _username}) when action in [:index] do
    socket
  end

  defp apply_action(socket, _action, _params) do
    socket
  end

  defp status_name(roles) do
    status_names = Application.get_env(:makoto, :status_name)

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
