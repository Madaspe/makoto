defmodule Makoto.Repo.Migrations.AddProcentToReferral do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :referrals_procent, :float, default: 0.15
    end
  end
end
