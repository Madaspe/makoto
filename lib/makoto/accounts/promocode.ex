defmodule Makoto.Accounts.Promocode do
  use Ecto.Schema
  import Ecto.Changeset

  schema "promocodes" do
    field :promocode, :string
    field :count_use, :integer
    field :item, :string
    field :owner_id, :integer

    many_to_many :users, Makoto.Accounts.User, join_through: "users_promocodes"
  end

    @doc false
    def changeset(promocode, attrs) do
      promocode
      |> cast(attrs, [:promocode, :count_use, :item, :owner_id])
      |> validate_required([:promocode, :count_use, :item, :owner_id])
    end
end
