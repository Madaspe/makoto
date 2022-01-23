defmodule MakotoWeb.ShopAssistentLive.Index do
  use MakotoWeb, :live_view

  alias Makoto.Accounts
  alias Makoto.Accounts.User
  alias Makoto.Shop

  @impl true
  def mount(%{"server" => server}, _session, socket) do
    {:ok,
    socket
    |> assign(:items, Shop.shop_items(server))
    |> assign(:server, server)}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Item")
    |> assign(:item, Makoto.Shop.get_item_by_id(id))
  end

  defp apply_action(socket, _, _) do
    socket
  end
end
