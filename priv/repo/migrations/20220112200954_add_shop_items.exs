defmodule Makoto.Repo.Migrations.AddShopItems do
  use Ecto.Migration

  def change do
    create table(:shop_items) do
      add :block_id, :string
      add :name, :citext
      add :count, :integer
      add :description, :citext
      add :category, :citext
      add :price, :integer
    end

    create table(:shop_items_servers) do
      add :server_info_id, references(:servers)
      add :item_id, references(:shop_items)
    end

    create unique_index(:shop_items_servers, [:server_info_id, :item_id])
  end
end
