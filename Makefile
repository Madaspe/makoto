.PHONY: startdev build buildmacos

default: startdev

build: 
	apt-get install -y gcc erlang-dev
	mix local.rebar --force
	mix local.hex --force
	mix deps.get
	mix phx.digest
	mix ecto.migrate
	mix compile

build: 
	mix deps.get
	mix phx.digest
	mix ecto.migrate
	mix compile

startdev:
	mix deps.get
	mix phx.digest
	mix ecto.migrate
	mix compile
	MIX_ENV="dev" iex -S mix phx.server