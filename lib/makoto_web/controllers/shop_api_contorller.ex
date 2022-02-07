defmodule MakotoWeb.ShopApiController do
  use MakotoWeb, :controller

  def index(conn, params) do
    text(conn, params)
  end

  def server(conn, %{"name" => server}) do
    logs =
      Makoto.Logs.get_buy_items_log()
      |> Poison.encode!()

    text(conn, logs)
  end
end
