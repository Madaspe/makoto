defmodule Makoto.Repo.Migrations.AddBuyItemLog do
  use Ecto.Migration

  def change do
    create table(:buy_item_logs) do
      add :user_id, :integer
      add :item_id, :integer
      timestamps()
    end
  end
end
