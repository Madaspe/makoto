defmodule Makoto.Repo.Migrations.AddModToItem do
  use Ecto.Migration

  def change do
    alter table(:shop_items) do
      add :mod, :string
    end
  end
end
