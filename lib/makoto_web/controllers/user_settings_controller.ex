defmodule MakotoWeb.UserSettingsController do
  use MakotoWeb, :controller

  alias Makoto.Accounts
  alias MakotoWeb.UserAuth

  def redirect_to_liveview(%Plug.Conn{assigns: %{current_user: %{username: username}}} = conn, _params) do
    redirect(conn, to: "/user/#{username}")
  end
end
