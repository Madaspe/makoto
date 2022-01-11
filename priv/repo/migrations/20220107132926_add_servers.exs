defmodule Makoto.Repo.Migrations.AddServers do
  use Ecto.Migration

  def change do
    create table(:servers) do
      add :server_name, :string
      add :server_ip, :string
      add :server_port, :integer
      add :description, :string
    end
  end
end
