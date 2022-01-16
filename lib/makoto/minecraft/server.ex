defmodule MakotoMinecraft.Minecraft.ServerInfo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "servers" do
    field :server_name, :string
    field :server_ip, :string
    field :server_port, :integer
    field :description, :string

    field :status, :string, virtual: true
    field :info, :string, virtual: true

    many_to_many :shop_items, MakotoMinecraft.Minecraft.Item, join_through: "shop_items_servers"
  end
end
