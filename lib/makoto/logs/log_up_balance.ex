defmodule Makoto.Logs.UpBalanceLog do
  use Ecto.Schema
  import Ecto.Changeset

  schema "up_balance_logs" do
    field :inv_id, :string
    field :custom, :string
    timestamps()
  end

    @doc false
    def changeset(translition_log, attrs) do
      translition_log
      |> cast(attrs, [:inv_id, :custom])
    end
end
