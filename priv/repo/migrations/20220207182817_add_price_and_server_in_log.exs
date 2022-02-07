defmodule Makoto.Repo.Migrations.AddPriceAndServerInLog do
  use Ecto.Migration

  def change do
    alter table(:buy_item_logs) do
      add :price_for_buy, :integer
      add :server_for_buy, :string
    end
  end
end
