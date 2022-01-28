defmodule MakotoWeb.ReferralContorller do
  use MakotoWeb, :controller

  require Logger
  def index(conn, _params = %{"id" => id}) do
    conn
    |> put_session(:inviter_id, id)
    |> redirect(to: "/")
  end
end
