defmodule MakotoWeb.CountTranslitionsController do
  use MakotoWeb, :controller

  require Logger
  def index(conn, %{"name" => name}) do
    Task.start(fn ->
      Makoto.Logs.increate_transitions_count_by_name(name)
    end)

    conn |> put_session(:from, name) |> redirect(to: "/")
  end
end
