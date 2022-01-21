defmodule Makoto.Repo.Migrations.AddUpBalanceLog do
  use Ecto.Migration

  def change do
    create table(:up_balance_logs) do
      add :inv_id, :string
      add :custom, :string
      timestamps()
    end
  end
end
