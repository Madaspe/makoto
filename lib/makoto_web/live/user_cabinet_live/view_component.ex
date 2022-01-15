defmodule MakotoWeb.UserCabinetLive.ViewComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger
  require ExImageInfo

  @impl true
  def update(assigns, socket) do
    {:ok,
    socket
    |> assign(assigns)
    |> assign(:uploaded_files, [])
    |> assign(:colors, ["Черный", "Темно-синий", "Темно-зеленый", "Биризовый", "Темно-красный", "Темно-фиолетовый", "Золотой", "Серый", "Темно-серый", "Синий", "Зеленый", "Сине-зеленый", "Красный", "Фиолетовый", "Желтый", "Белый"])
    |> allow_upload(:avatar, accept: ~w".png .jpg .jpeg", auto_upload: true, progress: &handle_progress/3)
    |> allow_upload(:cloak, accept: ~w".png", auto_upload: true, progress: &handle_progress/3)
    |> allow_upload(:skin, accept: ~w".png", auto_upload: true, progress: &handle_progress/3)}

  end

  @impl Phoenix.LiveView
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  @impl Phoenix.LiveView
  def handle_event("change_prefix", params = %{"user" => %{"prefix" => prefix_user, "nick_color" => nick_color}}, socket) do
    nick_color_symbol = %{
      "Черный" =>  "&0",
      "Темно-синий" =>  "&1",
      "Темно-зеленый" =>  "&2",
      "Биризовый" =>  "&3",
      "Темно-красный" =>  "&4",
      "Темно-фиолетовый" =>  "&5",
      "Золотой" =>  "&6",
       "Серый" =>  "&7",
      "Темно-серый" =>  "&8",
       "Синий" =>  "&9",
      "Зеленый" =>  "&a",
       "Сине-зеленый" =>  "&b",
      "Красный" =>  "&c",
      "Фиолетовый" =>  "&d",
      "Желтый" =>  "&e",
      "Белый" =>  "&f"
    } |> Map.get(nick_color)

    user =
      socket.assigns.user

    clean_prefix =
      prefix_user
      |> String.replace("&k", "")
      |> String.replace("&m", "")
      |> String.replace("&o", "")
      |> String.replace("&l", "")
      |> String.replace("&n", "")
      |> String.replace("&r", "")

    Logger.info(clean_prefix)
    prefix =
      "\"[#{clean_prefix}&7]#{nick_color_symbol}\""

    url =
      "http://#{Application.get_env(:makoto, :rcon_host)}:#{Application.get_env(:makoto, :rcon_port)}/console?command=lp user #{user.username} meta setprefix 99 #{prefix}"
      |> URI.encode()
      |> String.replace(" ", "%20")
      |> String.replace("&", "%26")
      |> String.replace("[", "%5B")
      |> String.replace("]", "%5D")
      case HTTPoison.get(url) do
          {:ok, %HTTPoison.Response{body: body}} ->
            {:ok, user} =
              new_user =
                socket.assigns.user
                |> Accounts.update_user %{prefix: clean_prefix}

              {:noreply, socket |> put_flash(:error, "Префикс сменен")
              |> assign(:user, new_user)
              |> push_redirect(to: Routes.user_cabinet_index_path(socket, :index, user.username))}
          _ ->
            Logger.error("Error change prefix #{url}")
            {:noreply, socket |> put_flash(:error, "Обратитесь к администрации проекта")}
      end
    {:noreply, socket}
  end

  @impl Phoenix.LiveView
  def handle_progress(:avatar, entry, socket) do
    if entry.done? do
      user =
        socket.assigns.user

      {flash_type, info} =
        consume_uploaded_entries(socket, :avatar, fn %{path: path}, _entry ->
          dest = Path.join("priv/static/uploads", "#{user.username}_avatar.png")
          File.cp!(path, dest)
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              Makoto.Accounts.update_user(user, %{avatar_url: "/uploads/#{user.username}_avatar.png"})
              MakotoXenForo.XenForo.update_avatar_by_username(user.username, "/uploads/#{user.username}_avatar.png")
              {:info, "Успешно"}
          end
      end) |> Enum.at(0)

      {:noreply, socket |> put_flash(flash_type, info) |> assign(:user, Makoto.Accounts.get_user_by_username!(user.username))}
    else
      {:noreply, socket}
    end
  end

  @impl Phoenix.LiveView
  def handle_progress(:skin, entry, socket) do
    if entry.done? do
      user =
        socket.assigns.user

      {flash_type, info} =
        consume_uploaded_entries(socket, :skin, fn %{path: path}, _entry ->
          dest = Path.join("priv/static/uploads", "#{user.username}_skin.png")
          File.cp!(path, dest)
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              if {x, y} in Application.get_env(:makoto, :allowed_expansion_skin) do
                Makoto.Accounts.update_user(user, %{skin_url: "/uploads/#{user.username}_skin.png"})
                {:info, "Успешно"}
              else
                {:info, "Недоступное расширение"}
              end
          end
      end) |> Enum.at(0)

      {:noreply, socket |> put_flash(flash_type, info) |> assign(:user, Makoto.Accounts.get_user_by_username!(user.username))}
    else
      {:noreply, socket}
    end
  end

  @impl Phoenix.LiveView
  def handle_progress(:cloak, entry, socket) do
    if entry.done? do
      user =
        socket.assigns.user

      {flash_type, info} =
        consume_uploaded_entries(socket, :cloak, fn %{path: path}, _entry ->
          dest = Path.join("priv/static/uploads", "#{user.username}_cape.png")
          File.cp!(path, dest)
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              if {x, y} in Application.get_env(:makoto, :allowed_expansion_cloak) do
                Makoto.Accounts.update_user(user, %{cloak_url: "/uploads/#{user.username}_cape.png"})
                {:info, "Успешно"}
              else
                {:info, "Недоступное расширение"}
              end
          end
      end) |> Enum.at(0)

      {:noreply, socket |> put_flash(flash_type, info) |> assign(:user, Makoto.Accounts.get_user_by_username!(user.username))}
    else
      {:noreply, socket}
    end
  end
end
