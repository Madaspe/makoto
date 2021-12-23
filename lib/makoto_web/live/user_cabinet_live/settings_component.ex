defmodule MakotoWeb.UserCabinetLive.SettingsComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns)}
  end

  @impl true
  def handle_params(params, _, socket) do
    {:noreply,
     socket |> assign(:type_of_settings, params.type_of_settings)}
  end
end
