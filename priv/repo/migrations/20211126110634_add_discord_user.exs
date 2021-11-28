defmodule Makoto.Repo.Migrations.AddDiscordUser do
  use Ecto.Migration

  def change do
    create table(:discord_users) do
      add :username, :string
      add :email, :string
      add :discord_id, :string
      add :user_id, references(:users)
      timestamps()
    end
    create unique_index(:discord_users, [:user_id])
  end
end
