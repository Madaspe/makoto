defmodule MakotoWeb.Router do
  use MakotoWeb, :router

  import MakotoWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {MakotoWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :owner do
    plug :check_role_user, [:owner]
  end

  get "/uploads/:filename", MakotoWeb.UploadViewController, :index
  scope "/", MakotoWeb do
    pipe_through :browser

    post "/pay/ok", PostController, :index
    post "/pay/error", PostController, :index
    get "/pay/ok", PageController, :index
    get "/pay/error", PageController, :index
    post "/", PostController, :index
    get "/", PageController, :index


    get "/ref/:id", ReferralContorller, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", MakotoWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: MakotoWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes
  scope "/", MakotoWeb do
    scope "/" do
      pipe_through :api
      post "/pay/ff0IHzMh4uvGZ4Awl2QItxnsaNvL9t92", CentAppContorller, :postback
    end

    pipe_through [:browser, :redirect_if_user_is_authenticated]
    get "/users/register", UserRegistrationController, :new
    post "/users/register", UserRegistrationController, :create
    get "/users/log_in", UserSessionController, :new
    post "/users/log_in", UserSessionController, :create
    get "/users/reset_password", UserResetPasswordController, :new
    post "/users/reset_password", UserResetPasswordController, :create
    get "/users/reset_password/:token", UserResetPasswordController, :edit
    put "/users/reset_password/:token", UserResetPasswordController, :update
  end

  scope "/", MakotoWeb do
    pipe_through [:browser, :require_authenticated_user]

    get "/users/settings", UserSettingsController, :redirect_to_liveview
    get "/users/settings/confirm_email/:token", UserSettingsController, :confirm_email
  end

  scope "/", MakotoWeb do
    pipe_through [:browser]
    delete "/users/log_out", UserSessionController, :delete
    get "/users/confirm", UserConfirmationController, :new
    post "/users/confirm", UserConfirmationController, :create
    get "/users/confirm/:token", UserConfirmationController, :edit
    post "/users/confirm/:token", UserConfirmationController, :update

    scope "/connect" do
      get "/:provider", UserSessionController, :request
      get "/:provider/callback", UserSessionController, :callback
    end

    live "/page/donate", UserCabinetLive.Index, :donat_page
    live "/page/rules", UserCabinetLive.Index, :rules_page

  end

  scope "/owner", MakotoWeb do
    pipe_through [:browser, :require_authenticated_user, :owner]

    live "/promocodes", OwnerLive.Index, :promocodes

    live "/users", OwnerLive.Index, :index
    live "/users/new", OwnerLive.Index, :new
    live "/users/:id/edit", OwnerLive.Index, :edit

    live "/users/:id", OwnerLive.Show, :show
    live "/users/:id/show/edit", OwnerLive.Show, :edit

    live "/promocode/:id", OwnerLive.ShowPromo, :show
  end

  scope "/user/:username", MakotoWeb do
    pipe_through [:browser, :require_authenticated_user]

    live "/", UserCabinetLive.Index, :index
    live "/buy/status", UserCabinetLive.Index, :buy_status

    scope "/referrals" do
      live "/:page", UserCabinetLive.Index, :list_referrals
    end

    live "/view", UserCabinetLive.Index, :view_settings

    scope "/settings" do
      live "/:type_of_settings", UserCabinetLive.Index, :settings

      scope "/update" do
        live "/email", UserCabinetLive.Index, :update_email
      end

    end

    scope "/unconnect" do
      live "/discord", UserCabinetLive.Index, :delete
    end

    scope "/balance" do
      live "/up", UserCabinetLive.Index, :up_balance
      live "/coins", UserCabinetLive.Index, :rubins_to_coins
    end
  end
  scope "/api", MakotoWeb do
    pipe_through :api
    post "/centapp", CentAppContorller, :index
    scope "/launcher" do
      get "/auth", LauncherAuthController, :index
    end

    scope "/user" do
      get ":username", UserGameController, :index
    end
  end
end
