defmodule MakotoWeb.CentAppController do
  use MakotoWeb, :controller

  alias Makoto.Accounts

  def check(conn, opts) do
    conn
    |> redirect(to: "/")
  end

end
