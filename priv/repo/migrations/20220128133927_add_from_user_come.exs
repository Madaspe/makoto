defmodule Makoto.Repo.Migrations.AddFromUserCome do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :from_come, :string
    end
  end
end
