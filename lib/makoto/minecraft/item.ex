defmodule MakotoMinecraft.Minecraft.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "shop_items" do
    field :block_id, :string
    field :name, :string
    field :count, :integer
    field :description, :string
    field :category, :string
    field :price, :integer
    field :mime_type, :string
    field :nbt, :string, [source: :NBT]
    field :place, :integer
    field :count_buy, :integer, default: 0
    many_to_many :servers, MakotoMinecraft.Minecraft.ServerInfo, join_through: "shop_items_servers"
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:count_buy, :block_id, :name, :count, :price, :place])
  end
end

defmodule MakotoMinecraft.Minecraft.ShopItem do
  use Ecto.Schema
  import Ecto.Changeset

  schema "niShop" do
    field :username, :string, source: :Player
    field :mime_type, :string, source: :MaterialData
    field :count, :integer, source: :Amount
    field :nbt, :string, source: :NBT
    field :taken_server_name, :string, source: :Taken
    field :server, :string, source: :Server
    field :name, :string, source: :Name
    field :lore, :string, source: :Lore
    field :ench, :string, source: :Enchantments
  end

    @doc false
    def changeset(shop_item, attrs) do
      shop_item
      |> cast(attrs, [:username, :mime_type, :count, :nbt, :server])
      |> validate_required([:username, :mime_type, :count, :nbt, :server])
    end
end
