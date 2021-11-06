defmodule MakotoWeb.PageController do
  use MakotoWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
