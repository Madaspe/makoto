#!/bin/sh

execute() {
    $1 || fail "$1"
}

start() {
    echo ">>> START STATUS: START"

    echo ">>> START STATUS: UPDATE"
    execute "mix deps.get"

    echo ">>> START STATUS: START ELIXIR APP"
    execute "mix ecto.migrate"
    execute "MIX_ENV=\"dev\" iex -S mix phx.server"

    echo ">>> START STATUS: FINISH"
}

start