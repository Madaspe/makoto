defmodule Makoto.Logs.TranslitionLog do
  use Ecto.Schema
  import Ecto.Changeset

  schema "translition_logs" do
    field :name, :string
    field :count, :integer
  end

    @doc false
    def changeset(translition_log, attrs) do
      translition_log
      |> cast(attrs, [:count])
    end
end
