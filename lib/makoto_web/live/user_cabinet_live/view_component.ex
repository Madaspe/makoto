defmodule MakotoWeb.UserCabinetLive.ViewComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger
  require ExImageInfo

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(assigns)

    user =
      Accounts.get_user_by_username!(assigns.username)

    {:ok,
    socket
    |> assign(assigns)
    |> assign(:uploaded_files, [])
    |> allow_upload(:avatar, accept: ~w".png", auto_upload: true, progress: &handle_progress/3)
    |> allow_upload(:cloak, accept: ~w".png", auto_upload: true, progress: &handle_progress/3)
    |> allow_upload(:skin, accept: ~w".png", auto_upload: true, progress: &handle_progress/3)}

  end

  @impl Phoenix.LiveView
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  def handle_progress(:avatar, entry, socket) do
    if entry.done? do
      user =
        socket.assigns.user

      {flash_type, info} =
        consume_uploaded_entries(socket, :avatar, fn %{path: path}, _entry ->
          dest = Path.join("priv/static/uploads", Path.basename(path))
          File.cp!(path, dest)
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              Makoto.Accounts.update_user(user, %{avatar_url: "/uploads/#{Path.basename(dest)}"})
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
          dest = Path.join("priv/static/uploads", Path.basename(path))
          File.cp!(path, dest)
          Logger.info inspect(ExImageInfo.type File.read!(dest))
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              if {x, y} in Application.get_env(:makoto, :allowed_expansion_skin) do
                Makoto.Accounts.update_user(user, %{skin_url: "/uploads/#{Path.basename(dest)}"})
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
          dest = Path.join("priv/static/uploads", Path.basename(path))
          File.cp!(path, dest)
          Logger.info inspect(ExImageInfo.type File.read!(dest))
          case ExImageInfo.info File.read!(dest) do
            nil ->
              {:error, "Файл должен быть в формате png"}
            {_, x, y, _} ->
              if {x, y} in Application.get_env(:makoto, :allowed_expansion_cloak) do
                Makoto.Accounts.update_user(user, %{cloak_url: "/uploads/#{Path.basename(dest)}"})
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
