defmodule Makoto.Repo.Migrations.AddView do
  use Ecto.Migration

  def change do
      alter table(:users) do
        add :avatar_url, :string
        add :skin_url, :string, default: "/uploads/steave.png"
        add :cloak_url, :string
      end
  end
end
