defmodule MakotoMinecraft.Minecraft.Info do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "online" do
    field :player, :string
    field :server, :string
    field :online, :integer
  end
end
