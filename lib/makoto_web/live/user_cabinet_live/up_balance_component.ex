defmodule MakotoWeb.UserCabinetLive.UpBalanceComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns)}
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

  def handle_event("submit", %{"user" => %{"rubins" => rubins}} = _unsigned_params, socket) do
    rubins_up =
      String.to_integer(rubins)
    if rubins_up >= 25 do
      discounts = Application.get_env(:makoto, :discount_on_rubins)

      user =
        socket.assigns.user

      if Map.has_key?(discounts, rubins_up) do
        {:noreply, socket |> redirect(external: Makoto.CentApp.Api.bill_create(%{amount: discounts[rubins_up]}, user.id, rubins_up)["link_page_url"])}
      else
        {:noreply, socket |> redirect(external: Makoto.CentApp.Api.bill_create(%{amount: rubins_up}, user.id, rubins_up)["link_page_url"])}
      end
    else
      {:noreply, socket |> put_flash(:error, "Минимальная сумма платежа 25 рублей")}
    end
  end


  def handle_event("submit_promocode", %{"promocode" => promocode} = _unsigned_params, socket) do
    user =
      socket.assigns.user

    result = promocode |> Makoto.Promocodes.get_promocode |> Makoto.Promocodes.apply_promocode(user)
    case result do
      :error ->
        {:noreply, socket |> clear_flash(:info) |> put_flash(:info, "Промокод недействителен")}

      :ok ->
        {:noreply, socket |> clear_flash(:info) |> put_flash(:info, "Промокод применен")}
    end
  end
end
