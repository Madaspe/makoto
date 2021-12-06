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
    |> assign(assigns)
    |> allow_upload(:avatar, accept: ~w".png")
    |> allow_upload(:cloak, accept: ~w".png")
    |> allow_upload(:skin, accept: ~w".png")}
  end
end
