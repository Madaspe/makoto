defmodule Makoto.Repo.Migrations.AddDiscordInviters do
  use Ecto.Migration

  def change do
    create table(:discord_invites) do
      add :inviter_id, :string
      add :user_id, :string
    end
  end
end
