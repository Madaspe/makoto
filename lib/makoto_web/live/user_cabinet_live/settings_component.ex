defmodule MakotoWeb.UserCabinetLive.SettingsComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns = %{type_of_settings: type_of_settings}, socket) do
    case type_of_settings do
      nil -> {:ok, socket |> assign(Map.merge(assigns, %{type_of_settings: "email"}))}
      _ -> {:ok, socket |> assign(assigns)}
    end
  end

  @impl true
  def handle_event("change-type", %{"type" => type}, socket) do
    {:noreply,
     socket |> assign(:type_of_settings, type)}
  end
end
