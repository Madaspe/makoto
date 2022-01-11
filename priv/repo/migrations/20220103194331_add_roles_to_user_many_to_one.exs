defmodule Makoto.Repo.Migrations.AddRolesToUserManyToOne do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add :name, :string
      add :privilege_disable_time, :native_datetime
      add :server, :string
      add :user_id, references(:users)
    end
  end
end
