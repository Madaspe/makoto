defmodule Makoto.Accounts.Role do
  use Ecto.Schema
  import Ecto.Changeset

  schema "roles" do
    field :name, :string
    field :privilege_disable_time, :utc_datetime
    field :server, :string

    belongs_to :user, Makoto.Accounts.User
  end
end
