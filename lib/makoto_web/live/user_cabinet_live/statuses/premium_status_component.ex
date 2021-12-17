defmodule MakotoWeb.UserCabinetLive.PremiumStatusComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger


  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns)}
  end
end
