defmodule Makoto.Shop do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query.API, warn: false
  alias Makoto.Repo

  alias MakotoMinecraft.Minecraft.Item
  alias MakotoMinecraft.Minecraft.ShopItem

  require Logger

  def put_shop_item(item), do: MakotoMinecraft.MinecraftRepo.insert!(item)

  def search_items_by_all_fields(search) do
    from(item in Item,
      where:
        like(item.name, ^"%#{search}%") or
          ilike(item.block_id, ^"%#{search}%") or
          ilike(item.category, ^"%#{search}%"),
      order_by: item.block_id
    )
    |> Repo.all()
    |> Repo.preload([:servers])
  end

  @spec get_shopping_basket_by_username(any) :: any
  def get_shopping_basket_by_username(username),
    do: ShopItem |> where(username: ^username) |> MakotoMinecraft.MinecraftRepo.all()

  def get_item_by_id(id), do: Item |> where(id: ^id) |> Repo.one!()

  def update_item(item, attrs), do: item |> Item.changeset(attrs) |> Repo.update()

  def increate_count_buy_by_id(id) do
    get_item_by_id(id)
    |> Kernel.then(fn item -> update_item(item, %{count_buy: Kernel.+(item.count_buy, 1)}) end)
  end

  def shop_items(server) do
    case MakotoMinecraft.Minecraft.get_server_by_name(String.downcase(server)) do
      nil ->
        []

      server ->
        server
        |> Makoto.Repo.preload([:shop_items])
        |> Map.get(:shop_items)
        |> sort_shop_items()
    end
  end

  def update_item(%Item{} = item, attrs) do
    item
    |> Item.changeset(attrs)
    |> Repo.update()
  end

  def sort_shop_items(items) do
    items
    |> Enum.sort_by(fn item -> String.to_integer(item.block_id) end)
    |> Enum.sort_by(fn item -> item.count_buy end, :desc)
    |> Enum.sort_by(fn item -> item.place end)
    |> Enum.filter(fn item ->
      File.exists?("priv/static/img/itemsForShop/#{String.replace(item.mime_type, ":", "_")}.png")
    end)
  end

  def xlsx_data_to_items(data) do
    data
    |> Enum.filter(fn x -> Kernel.>(length(x[:rows]), 1) end)
    |> Enum.map(&xlsx_parse_rows(&1))
    |> Enum.map(fn x ->
      Enum.reduce(x, [], &[&1 | &2])
    end)
  end

  defp xlsx_parse_rows(%{rows: rows, mod: mod}) do
    [head | tail] = rows

    head
    |> Enum.with_index()
    |> Map.new()
    |> xlsx_rows_to_items(tail, mod)
  end

  defp xlsx_rows_to_items(items, rows, mod) do
    rows
    |> Enum.map(&row_to_item(&1, items, mod))
  end

  defp row_to_item(row, indexies, mod) do
    %MakotoMinecraft.Minecraft.Item{
      mime_type: get_data_from_row_by_key(row, "mime_type", indexies),
      name: get_data_from_row_by_key(row, "name", indexies),
      count: get_data_from_row_by_key(row, "count", indexies),
      description: get_data_from_row_by_key(row, "description", indexies),
      category: get_data_from_row_by_key(row, "category", indexies),
      price: get_data_from_row_by_key(row, "price", indexies),
      nbt: get_data_from_row_by_key(row, "NBT", indexies),
      mod: mod
    }
  end

  defp get_data_from_row_by_key(row, key, indexies) do
    case indexies[key] do
      nil -> ""
      index -> row |> Enum.at(index, "")
    end
  end

  # MakotoMinecraft.Minecraft.Item
end
