defmodule Makoto.Repo.Migrations.AddPromocode do
  use Ecto.Migration

  def change do
    create table(:promocodes) do
      add :promocode, :string
      add :count_use, :integer
      add :item, :string
      add :owner_id, :integer
    end
      create table(:users_promocodes) do
        add :user_id, references(:users)
        add :promocode_id, references(:promocodes)
      end

      create unique_index(:users_promocodes, [:user_id, :promocode_id])
  end
end
