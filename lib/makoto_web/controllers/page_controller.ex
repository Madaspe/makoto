defmodule MakotoWeb.PageController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params) do
    render(conn, "index.html")
  end
end
