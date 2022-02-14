#!/bin/sh

execute() {
    $1 || fail "$1"
}

build() {
    echo ">>> BUILD STATUS: START"

    echo ">>> BUILD STATUS: UPDATE"
    execute "apt-get update"
    echo ">>> INSTALL DEPS"
    execute "apt-get install -y gcc erlang-dev make"

    echo ">>> BUILD STATUS: INSTALL ELIXIR DEPS"
    execute "mix local.rebar --force"
    execute "mix local.hex --force"
    execute "mix deps.get"

    echo ">>> BUILD STATUS: START ELIXIR APP"
    execute "mix phx.digest"
    execute "mix ecto.migrate"
    execute "mix compile"

    echo ">>> BUILD STATUS: FINISH"
}

build