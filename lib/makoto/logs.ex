defmodule Makoto.Logs do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Makoto.Repo

  alias Makoto.Accounts.{User, UserToken, UserNotifier}
  alias Makoto.Logs
  require Logger

  def get_transitions_log_by_name(name), do: Logs.TranslitionLog |> where(name: ^name) |> Repo.one()
  def get_transitions_log_by_id(id), do: Logs.TranslitionLog |> where(id: ^id) |> Repo.one()
  def get_all_transitions_logs(), do: Logs.TranslitionLog |> Repo.all()
  def update_transitions_log(transitions_log, attrs), do: transitions_log |> Logs.TranslitionLog.changeset(attrs) |> Repo.update()
  def increate_transitions_count_by_name(name) do
    case get_transitions_log_by_name(name) do
      nil ->
        nil
      log_translition ->
        log_translition
        |> update_transitions_log(%{count: log_translition.count + 1})
    end
  end

  def add_up_balance_log(log), do: log |> Repo.insert!()
  def add_buy_item_log(log), do: log |> Repo.insert!()
  def get_buy_items_log(), do: Logs.LogBuyItem |> Repo.all() |> Repo.preload([:user, :item])
end
