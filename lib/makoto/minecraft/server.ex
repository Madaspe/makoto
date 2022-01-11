defmodule MakotoMinecraft.Minecraft.ServerInfo do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "servers" do
    field :server_name, :string
    field :server_ip, :string
    field :server_port, :integer
    field :description, :string

    field :status, :string, virtual: true
    field :info, :string, virtual: true
  end
end
