defmodule Makoto.Repo.Migrations.CreateRefsSystem do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :inviter_id, :integer
      add :rubins_for_inviter, :float
    end
  end
end
