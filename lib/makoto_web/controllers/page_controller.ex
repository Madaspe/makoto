defmodule MakotoWeb.PageController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params) do
    Logger.info inspect(get_session(conn))
    render(conn, "index.html")
  end
end
