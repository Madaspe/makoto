import Config

# config/runtime.exs is executed for all environments, including
# during releases. It is executed after compilation and before the
# system starts, so it is typically used to load production configuration
# and secrets from environment variables or elsewhere. Do not define
# any compile-time configuration in here, as it won't be applied.
# The block below contains prod specific runtime configuration.
if config_env() == :prod do
  # The secret key base is used to sign/encrypt cookies and other secrets.
  # A default value is used in config/dev.exs and config/test.exs but you
  # want to use a different value for prod and you most likely don't want
  # to check this value into version control, so we use an environment
  # variable instead.
  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """
  database_url =
    System.get_env("DATABASE_URL") ||
      raise """
      environment variable DATABASE_URL is missing.
      For example: ecto://USER:PASS@HOST/DATABASE
      """

  minecraft_database_url =
    System.get_env("MINECRAFT_DATABASE_URL") ||
      raise """
      environment variable MINECRAFT_DATABASE_URL is missing.
      For example: ecto://USER:PASS@HOST/DATABASE
      """

  config :makoto, Makoto.Repo,
    url: database_url,
    pool_size: 10

  config :makoto, MakotoMinecraft.MinecraftRepo,
    url: minecraft_database_url,
    pool_size: 10

  relay_email =
    System.get_env("RELAY_EMAIL") ||
      raise """
      environment variable RELAY_EMAIL is missing.
      """

  username_email =
    System.get_env("USERNAME_EMAIL") ||
      raise """
      environment variable USERNAME_EMAIL is missing.
      """

  password_email =
    System.get_env("PASSWORD_EMAIL") ||
      raise """
      environment variable PASSWORD_EMAIL is missing.
      """

  cent_app_token =
    System.get_env("CENT_APP_TOKEN") ||
      raise """
      environment variable CENT_APP_TOKEN is missing.
      """

  cent_app_shop_id =
    System.get_env("CENT_APP_SHOP_ID") ||
      raise """
      environment variable CENT_APP_SHOP_ID is missing.
      """

  config :makoto, MakotoWeb.Endpoint,
    http: [
      # Enable IPv6 and bind on all interfaces.
      # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
      # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
      # for details about using IPv6 vs IPv4 and loopback vs public addresses.
      ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: String.to_integer(System.get_env("PORT") || "4000")
    ],
    secret_key_base: secret_key_base


  config :makoto, Makoto.Mailer,
    adapter: Swoosh.Adapters.SMTP,
    relay: relay_email,
    username: username_email,
    password:  password_email,
    auth: :always

  config :makoto,
    cent_app_token: cent_app_token,
    cent_app_shop_id: cent_app_shop_id

  client_id =
    System.get_env("DISCORD_CLIENT_ID") ||
              raise """
              environment variable DISCORD_CLIENT_ID is missing.
              """
  client_secret =
    System.get_env("DISCORD_CLIENT_SECRET") ||
                    raise """
                    environment variable DISCORD_CLIENT_SECRET is missing.
                    """

  config :ueberauth, Ueberauth.Strategy.Discord.OAuth,
  client_id: client_id,
  client_secret:  client_secret

  rcon_host =
    System.get_env("RCON_HOST") ||
              raise """
              environment variable RCON_HOST is missing.
              """
  rcon_password =
    System.get_env("RCON_PASSWORD") ||
                    raise """
                    environment variable RCON_PASSWORD is missing.
                    """

  rcon_port =
    System.get_env("RCON_PORT") ||
                    raise """
                    environment variable RCON_PORT is missing.
                    """

  config :makoto,
    rcon_host: rcon_host,
    rcon_port: String.to_integer(rcon_port),
    rcon_password: rcon_password

  xenforo_token =
    System.get_env("XENFORO_TOKEN") ||
                    raise """
                    environment variable XENFORO_TOKEN is missing.
                    """
  config :makoto,
    xenforo_token: xenforo_token


  mctop_token =
    System.get_env("MCTOP_TOKEN") ||
                    raise """
                    environment variable MCTOP_TOKEN is missing.
                    """

  topcraft_token =
    System.get_env("TOPCRAFT_TOKEN") ||
                    raise """
                    environment variable TOPCRAFT_TOKEN is missing.
                    """

  config :makoto,
    topcraft_votin_token: topcraft_token,
    mctop_voting_token: mctop_token
  # ## Using releases
  #
  # If you are doing OTP releases, you need to instruct Phoenix
  # to start each relevant endpoint:
  #
  #     config :makoto, MakotoWeb.Endpoint, server: true
  #
  # Then you can assemble a release by calling `mix release`.
  # See `mix help release` for more information.

  # ## Configuring the mailer
  #
  # In production you need to configure the mailer to use a different adapter.
  # Also, you may need to configure the Swoosh API client of your choice if you
  # are not using SMTP. Here is an example of the configuration:
  #
  #     config :makoto, Makoto.Mailer,
  #       adapter: Swoosh.Adapters.Mailgun,
  #       api_key: System.get_env("MAILGUN_API_KEY"),
  #       domain: System.get_env("MAILGUN_DOMAIN")
  #
  # For this example you need include a HTTP client required by Swoosh API client.
  # Swoosh supports Hackney and Finch out of the box:
  #
  #     config :swoosh, :api_client, Swoosh.ApiClient.Hackney
  #
  # See https://hexdocs.pm/swoosh/Swoosh.html#module-installation for details.
end
