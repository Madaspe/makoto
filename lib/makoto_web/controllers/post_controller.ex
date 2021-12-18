defmodule MakotoWeb.PostController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params) do
    conn
    |> redirect(to: "/")
  end
end
