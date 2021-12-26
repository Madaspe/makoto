defmodule MakotoMinecraft.MinecraftRepo do
  use Ecto.Repo,
    otp_app: :makoto,
    adapter: Ecto.Adapters.MyXQL
end
