defmodule MakotoWeb.UserCabinetLive.ViewComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(assigns)

    user =
      Accounts.get_user_by_username!(assigns.username)

    {:ok,
    socket
    |> assign(:uploaded_files, [])
    |> allow_upload(:avatar, accept: ~w(.jpg .jpeg))}
    # |> allow_upload(:cloak, accept: ~w".png")
    # |> allow_upload(:skin, accept: ~w".png")}

  end

  @impl Phoenix.LiveView
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  @impl Phoenix.LiveView
  def handle_event("save", params, socket) do
    uploaded_files =
      consume_uploaded_entries(socket, :avatar, fn %{path: path}, _entry ->
        dest = Path.join("priv/static/uploads", Path.basename(path))
        File.cp!(path, dest)
        Routes.static_path(socket, "/uploads/#{Path.basename(dest)}")
      end)
    {:noreply, update(socket, :uploaded_files, &(&1 ++ uploaded_files))}
  end
end
