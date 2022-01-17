defmodule Makoto.Repo do
  use Ecto.Repo,
    otp_app: :makoto,
    adapter: Ecto.Adapters.Postgres

end
