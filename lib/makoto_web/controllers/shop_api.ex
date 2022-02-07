defmodule MakotoWeb.ShopApi do
  import Plug.Conn
  import Phoenix.Controller

  def check_token(conn, _params) do
    if is_auth?(conn) do
      conn
    else
      must_log_message(conn, "error")
    end
  end

  defp must_log_message(conn, message) do
    conn
    |> text(message)
    |> halt()
  end

  defp is_auth?(conn) do
    conn.req_headers
    |> Enum.map(fn header ->
      {name, value} = header

      if name == "authorization" and value == Application.get_env(:makoto, :api_site_token) do
        true
      else
        false
      end
    end)
    |> Enum.any?()
  end
end
