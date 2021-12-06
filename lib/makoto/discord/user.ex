defmodule Makoto.Discord.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "discord_users" do
    field :username, :string
    field :discord_id, :string
    belongs_to :user, Makoto.Accounts.User
    timestamps()
  end

  @doc false
  def changeset(user, attrs \\ []) do
    user
    |> cast(attrs, [:username, :discord_id])
    |> validate_required([:username, :discord_id])
  end
end
