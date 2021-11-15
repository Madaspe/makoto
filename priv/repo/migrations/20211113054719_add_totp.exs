defmodule Makoto.Repo.Migrations.AddTOTP do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :otp_last, :integer, default: 0
      add :otp_secret, :string
    end
  end
end
