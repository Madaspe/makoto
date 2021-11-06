defmodule Makoto.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Makoto.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Makoto.PubSub}
      # Start a worker by calling: Makoto.Worker.start_link(arg)
      # {Makoto.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Makoto.Supervisor)
  end
end
