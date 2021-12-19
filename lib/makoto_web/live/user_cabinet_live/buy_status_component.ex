defmodule MakotoWeb.UserCabinetLive.BuyStatusComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger


  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns) |> assign(:view_status_current, "vip")}
  end

  @impl true
  def handle_event("buy", params = %{"server" => server, "status" => status}, socket) do
    
  end

  @impl true
  def handle_event(status, params, socket) do
     {:noreply, socket |> assign(:view_status_current, status)}
  end
end
