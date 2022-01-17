defmodule MakotoWeb.UserCabinetLive.ShopComponent do
  @items_per_row 4
  @items_per_page 3 * @items_per_row
  use MakotoWeb, :live_component

  require Logger
  alias MakotoMinecraft.Minecraft
  alias Makoto.Accounts
  alias Makoto.Shop
  @impl true
  def update(assigns = %{params: %{"page" => page, "server" => server}}, socket) do

    servers =
      Minecraft.get_servers()

    items =
      shop_items(page, server, servers)

    items_per_page =
      get_items_for_page(items, 1)

    {:ok,
    socket
    |> assign(assigns)
    |> assign(:servers, servers)
    |> assign(:current_server, String.downcase(server))
    |> assign(:items, items_per_page)
    |> assign(:server_name, servers |> Enum.find(fn x -> String.downcase(x.server_name) == String.downcase(server) end))
    |> assign(:search, "")
    |> assign(:page, 1)
    |> assign(:max_page, get_max_page(items))}
  end

  def update(assigns, socket) do
    items =
      shopping_basket_items(assigns.user)

      items_per_page =
        get_items_for_page(items, 1)

    {:ok,
    socket
    |> assign(assigns)
    |> assign(:items, items_per_page)
    |> assign(:search, "")
    |> assign(:page, 1)
    |> assign(:max_page, get_max_page(items))}
  end

  @impl true
  def handle_params(params, _, socket) do
    IO.inspect(params)
    {:noreply,
     socket}
  end

  def handle_event("search", params = %{"search" => search}, socket) do
    items =
      Makoto.Shop.search_items_by_all_fields(search)
      |> Enum.map(fn item ->
        servers_item =
          item.servers
          |> Enum.map(fn server -> String.downcase(server.server_name) end)
        Map.merge(item, %{servers_name: servers_item})
      end)
      |> Enum.filter(fn item -> socket.assigns.current_server in item.servers_name end)
      |> Enum.sort_by(fn item -> String.to_integer(item.block_id) end)
      |> Enum.sort_by(fn item -> item.count_buy end, :desc)
      |> Enum.sort_by(fn item -> item.place end)

    {:noreply, socket |> assign(:items, get_items_for_page(items, 1)) |> clear_flash() |> assign(:search, search) |> assign(:page, 1) |> assign(:max_page, get_max_page(items))}
  end

  def handle_event("item_info", params = %{"id" => id}, socket) do
    IO.inspect(params)
    {:noreply, socket |> assign(:item, Makoto.Shop.get_item_by_id(id)) |> clear_flash()}
  end

  def handle_event("buy", params = %{"id" => id}, socket) do
    item_to_buy =
      Makoto.Shop.get_item_by_id(id)

    user =
      socket.assigns.user
    cond do
      user.rubins >= item_to_buy.price ->
        {:ok, user} =
          Accounts.update_user(user, %{rubins: user.rubins - item_to_buy.price})
        Shop.put_shop_item(%MakotoMinecraft.Minecraft.ShopItem{
          username: user.username,
          mime_type: item_to_buy.mime_type,
          count: item_to_buy.count,
          nbt: item_to_buy.nbt,
          server: socket.assigns.current_server,
          name: item_to_buy.name,
          lore: "",
          ench: ""
        })
        Shop.increate_count_buy_by_id(item_to_buy.id)
        {:noreply, socket |> clear_flash() |> put_flash(:info, "Вы успешно приобрели предмет '#{item_to_buy.name}'") |> assign(:user, user)}
      true ->
        {:noreply, socket |> clear_flash() |> put_flash(:info, "У вас недостаточно рубинов")}
    end
  end

  def handle_event("page", params = %{"page" => page}, socket) do
    page =
      String.to_integer(page)
    if socket.assigns.live_action in [:shop] do
      items =
        shop_items(page, socket.assigns.current_server, socket.assigns.servers)

      {:noreply, socket |> assign(:page, page) |> assign(:items, get_items_for_page(items, page)) |> clear_flash()}
    else
      items =
        shopping_basket_items(socket.assigns.user)

        {:noreply, socket |> assign(:page, page) |> assign(:items, get_items_for_page(items, page)) |> clear_flash()}
    end
  end

  def shop_items(page, server, servers) do
    Minecraft.get_server_by_name(String.downcase(server))
    |> Makoto.Repo.preload([:shop_items])
    |> Map.get(:shop_items)
    |> Enum.sort_by(fn item -> String.to_integer(item.block_id) end)
    |> Enum.sort_by(fn item -> item.count_buy end, :desc)
    |> Enum.sort_by(fn item -> item.place end)
  end

  def shopping_basket_items(user) do
    Makoto.Shop.get_shopping_basket_by_username(user.username)
  end

  defp get_items_for_page(items, page) do
    Enum.chunk_every(items, @items_per_page)
    |> Enum.at(page - 1, [])
  end

  defp get_max_page(items) do
    Enum.chunk_every(items, @items_per_page)
    |> length()
  end
end
