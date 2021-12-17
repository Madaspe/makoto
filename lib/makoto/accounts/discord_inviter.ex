defmodule Makoto.Accounts.DiscordInviter do
  use Ecto.Schema
  import Ecto.Changeset

  schema "discord_invites" do
    field :inviter_id, :string
    field :user_id, :string
  end

    @doc false
    def changeset(discord_inviter, attrs) do
      discord_inviter
      |> cast(attrs, [:inviter_id, :user_id])
    end

end
