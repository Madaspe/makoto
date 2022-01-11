defmodule Makoto.Repo.Migrations.AddVotingCount do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :count_voting, :integer, default: 0
    end
  end
end
