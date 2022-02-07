defmodule Makoto.Logs.LogBuyItem do
  use Ecto.Schema
  import Ecto.Changeset

  schema "buy_item_logs" do
    # field :user_id, :integer
    belongs_to :user, Makoto.Accounts.User
    belongs_to :item, MakotoMinecraft.Minecraft.Item
    field :price_for_buy, :integer
    field :server_for_buy, :string
    # field :item_id, :integer
    timestamps()
  end

  @doc false
  def changeset(translition_log, attrs) do
    translition_log
    |> cast(attrs, [:user_id, :item_id, :price_for_buy, :server_for_buy])
  end
end
