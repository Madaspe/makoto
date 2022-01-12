defmodule Makoto.Repo.Migrations.AddLogsTranslition do
  use Ecto.Migration

  def change do
    create table(:translition_logs) do
      add :name, :string
      add :count, :integer
    end
  end
end
