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
     |> assign(:server, server)
     |> allow_upload(:exel, accept: ~w".xlsx", auto_upload: true, progress: &handle_progress/3)
     |> assign(:dest, "dest")
     |> assign(:uploaded_files, [])
     |> assign(:items_exel, [])}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  @impl true
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  def handle_progress(:exel, entry, socket) do
    if entry.done? do
      items =
        consume_uploaded_entries(socket, :exel, fn %{path: path}, entry ->
          Makoto.Utils.Xlsx.Parse.parse_xlsx_for_shop(path)
          |> Makoto.Shop.xlsx_data_to_items()
        end)

      {:noreply, socket |> assign(:items_exel, items)}
    else
      {:noreply, socket}
    end
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
