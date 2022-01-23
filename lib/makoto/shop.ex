defmodule Makoto.Shop do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query.API, warn: false
  alias Makoto.Repo

  alias Makoto.Accounts.{User, UserToken, UserNotifier}
  alias Makoto.Logs

  alias MakotoMinecraft.Minecraft.Item
  alias MakotoMinecraft.Minecraft.ShopItem

  require Logger

  def put_shop_item(item), do: MakotoMinecraft.MinecraftRepo.insert!(item)

  def search_items_by_all_fields(search) do
    from(item in Item,
     where: like(item.name, ^"%#{search}%") or
     ilike(item.block_id, ^"%#{search}%") or
     ilike(item.description, ^"%#{search}%") or
     ilike(item.category, ^"%#{search}%"), order_by: item.block_id) |> Repo.all() |> Repo.preload([:servers])
  end

  def get_shopping_basket_by_username(username), do: ShopItem |> where(username: ^username) |> MakotoMinecraft.MinecraftRepo.all()

  def get_item_by_id(id), do: Item |> where(id: ^id) |> Repo.one!()

  def update_item(item, attrs), do: item |> Item.changeset(attrs) |> Repo.update()

  def increate_count_buy_by_id(id) do
    get_item_by_id(id)
    |> Kernel.then(fn item -> update_item(item, %{count_buy: Kernel.+(item.count_buy, 1)}) end)
  end

  def shop_items(server) do
    MakotoMinecraft.Minecraft.get_server_by_name(String.downcase(server))
    |> Makoto.Repo.preload([:shop_items])
    |> Map.get(:shop_items)
    |> Enum.sort_by(fn item -> String.to_integer(item.block_id) end)
    |> Enum.sort_by(fn item -> item.count_buy end, :desc)
    |> Enum.sort_by(fn item -> item.place end)
    |> Enum.filter(fn item ->
      File.exists?("priv/static/img/itemsForShop/#{String.replace(item.mime_type, ":" , "_" )}.png")
    end)
  end

  def update_item(%Item{} = item, attrs) do
    item
    |> Item.changeset(attrs)
    |> Repo.update()
  end
end
