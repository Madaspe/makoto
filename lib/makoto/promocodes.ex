defmodule Makoto.Promocodes do
  @moduledoc """
  The Promocodes context.
  """

  import Ecto.Query, warn: false
  alias Makoto.Repo
  require Logger
  def change_promocode(%Makoto.Promocodes.Promocode{} = promocode, attrs \\ %{}) do
    Makoto.Promocodes.Promocode.changeset(promocode, attrs)
  end

  def update_promocode(%Makoto.Promocodes.Promocode{} = user, attrs) do
    user
    |> Makoto.Promocodes.Promocode.changeset(attrs)
    |> Repo.update()
  end

  def get_promocode(name_promocode), do: Makoto.Promocodes.Promocode |> where(promocode: ^name_promocode) |> Repo.one()

  def apply_promocode(promocode, user) do
    user_with_promocodes =
      user
      |> Repo.preload([:promocodes])

    case promocode do
      nil ->
        :error
      promocode ->
        item =
          promocode.item
          |> String.split(":")
        cond do
          promocode.count_use == -100 or promocode.count_use > 0 and (promocode in user_with_promocodes.promocodes) != true ->
            user_with_promocodes
            |> Ecto.Changeset.change()
            |> Ecto.Changeset.put_assoc(:promocodes, [promocode])
            |> Repo.update!

            apply_promocode_item(user, item)
            if promocode.count_use > 0 do
              promocode
              |> update_promocode(%{count_use: promocode.count_use - 1})
            end

            :ok
          true ->
            :error
        end
    end
  end

  def apply_promocode_item(user, ["give", "rubins", count]) do
    user
    |> Makoto.Accounts.update_user(%{rubins: user.rubins + String.to_integer(count)})
  end

  def apply_promocode_item(user, ["give", "role", role, days]) do
    user
    |> Makoto.Accounts.update_user(%{role: String.to_atom(role), privilege_disable_time: DateTime.utc_now() |> DateTime.add(String.to_integer(days) *  86400)})
  end

  def apply_promocode_item(user, ["give", "discount", procent]) do
    :ok
  end
end
