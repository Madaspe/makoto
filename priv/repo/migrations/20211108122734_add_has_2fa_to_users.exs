defmodule Makoto.Repo.Migrations.AddHas2faToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:has_2fa, :boolean, default: true)
    end
  end
end
