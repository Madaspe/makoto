defmodule MakotoWeb.OwnerLive.ShowPromo do
  use MakotoWeb, :live_view

  alias Makoto.Promocodes

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:promocode, Promocodes.get_promocode_by_id!(id))}
  end
end
