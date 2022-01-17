defmodule Makoto.Repo.Migrations.AddCountBuy do
  use Ecto.Migration

  def change do
    alter table(:shop_items) do
      add :count_buy, :integer, default: 0
    end
  end
end
