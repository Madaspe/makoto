defmodule Makoto.Repo.Migrations.AddRezervFieldInItem do
  use Ecto.Migration

  def change do
    alter table(:shop_items) do
      add :place, :integer, default: 9999999
    end
  end
end
