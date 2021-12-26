# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

host_url =
  System.get_env("HOST_URL") ||
              raise """
              environment variable DISCORD_CLIENT_ID is missing.
              """

config :makoto,
  ecto_repos: [Makoto.Repo, MakotoMinecraft.MinecraftRepo],
  allowed_expansion_skin: [{32, 32}, {64, 32}, {64, 64}, {1024, 512}, {1024, 1024}],
  allowed_expansion_cloak: [{22, 17}, {64, 32}, {176, 136},{1024, 512}],
  allowed_expansion_avatar: [{64, 32}, {64, 64}, {1024, 512}, {1024, 1024}],

  status_prices: %{
    6 => 99,
    7 => 299,
    8 => 699,
    9 => 999
  },

  discount_on_rubins: %{
    525 => 490,
    1100 => 990,
    3450 => 2990,
    6000 => 4990,
    12_500 => 9900
  },

  status_name: %{
    user: "Игрок",
    admin: "Админ",
    mod: "Модератор",
    developer: "Разработчик",
    owner: "Владелец",
    vip: "VIP",
    premium: "Premium",
    optimum: "Oprimum",
    ultimate: "Ultimate"

  }

config :makoto, MakotoWeb.Endpoint,
  url: [host: host_url],
  render_errors: [view: MakotoWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Makoto.PubSub,
  live_view: [signing_salt: "3tiz0xP3"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :ueberauth, Ueberauth,
  base_path: "/connect",
  providers: [
    discord:
      {Ueberauth.Strategy.Discord,
       [request_path: "/connect/discord", callback_path: "/connect/discord/callback"]}
  ]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.


import_config "#{config_env()}.exs"
