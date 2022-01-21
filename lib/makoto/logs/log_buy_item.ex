defmodule Makoto.Logs.LogBuyItem do
  use Ecto.Schema
  import Ecto.Changeset

  schema "buy_item_logs" do
    field :user_id, :integer
    field :item_id, :integer
    timestamps()
  end

    @doc false
    def changeset(translition_log, attrs) do
      translition_log
      |> cast(attrs, [:user_id, :item_id])
    end
end
