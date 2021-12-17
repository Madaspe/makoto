defmodule Makoto.Repo.Migrations.AddRubins do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:rubins, :float, default: 0)
    end
  end
end
