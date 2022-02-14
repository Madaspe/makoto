#!/bin/sh

execute() {
    $1 || fail "$1"
}

build() {
    echo ">>> BUILD: START"

    echo ">>> UPDATE"
    execute "apt-get update"
    echo ">>> INSTALL DEPS"
    execute "apt-get install -y gcc erlang-dev make"

    echo ">>> INSTALL ELIXIR DEPS"
    execute "mix local.rebar --force"
    execute "mix local.hex --force"
    execute "mix deps.get"

    echo ">>> START BUILD ELIXIR APP"
    execute "mix phx.digest"
    execute "mix ecto.migrate"
    execute "mix compile"

    echo ">>> BUILD: FINISH"
}

build