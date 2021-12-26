defmodule Makoto.Repo.Migrations.Addendroletime do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :privilege_disable_time, :naive_datetime
    end
  end
end
