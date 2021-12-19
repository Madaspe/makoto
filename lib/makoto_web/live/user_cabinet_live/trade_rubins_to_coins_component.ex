defmodule MakotoWeb.UserCabinetLive.TradeRubinsToCoinsComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(assigns)
    {:ok, socket |> assign(assigns) |> assign(:rubins_count, 1)}
  end

  @impl true
  def handle_params(_params, _, socket) do
    user =
      socket.assigns.user

    {:noreply,
     socket
     |> assign(:user, user)
     |> assign(:changeset, User.balance_changeset(user))}
  end

  def handle_event("submit", %{"sum" => sum_binary} = _unsigned_params, socket) when sum_binary do
    user =
      socket.assigns.user

    sum =
      sum_binary
      |> String.to_integer()

    if user.rubins >= sum do
      {:ok, %HTTPoison.Response{body: body}} =
        HTTPoison.post(
        "#{Application.get_env(:makoto, :rcon_host)}:#{Application.get_env(:makoto, :rcon_port)}/console?command=eco give #{user.username} add #{sum*100}"
        )
      user
      |> Accounts.update_user(%{rubins: user.rubins - sum})

      {:noreply, socket |> put_flash(:info, "Успешно") |> assign(:rubins_count, 1)}
    else
      {:noreply, socket |> put_flash(:error, "Не достаточно рубинов") |> assign(:rubins_count, 1)}
    end
  end

  def handle_event("submit", %{"sum" => sum_binary} = _unsigned_params, socket) when sum_binary do
    {:noreply, socket}
  end

  def handle_event("validate",  %{"sum" => sum_binary} = _unsigned_params, socket) do
    {:noreply, socket |> assign(:rubins_count, String.to_integer(sum_binary))}
  end
end
