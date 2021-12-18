defmodule MakotoWeb.UserCabinetLive.UpBalanceComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(assigns)
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

    # new_count_rubins =
    #   user.rubins + rubins_up

    # Logger.info inspect(Accounts.get_user_by_id(user.inviter_id))
    # case Accounts.get_user_by_id(user.inviter_id) do
    #   nil ->
    #     Accounts.update_user(user, %{rubins: new_count_rubins})
    #   inviter ->
    #     Accounts.update_user(user, %{rubins: new_count_rubins, rubins_for_inviter: rubins_up * inviter.referrals_procent + user.rubins_for_inviter})
    # end

    # {:noreply, socket
    # |> put_flash(:info, "balance has been successfully replenished with #{rubins_up} rubies")
    # |> push_redirect(to: socket.assigns.return_to)}
  end

  def handle_event("submit", %{"user" => %{"rubins" => rubins}} = _unsigned_params, socket) when socket.assigns.user.inviter_id == nil  do
    # user =
    #   socket.assigns.user

    # rubins_up =
    #   String.to_float(rubins)

    # new_count_rubins =
    #   user.rubins +  rubins_up

    # Accounts.update_user(user, %{rubins: new_count_rubins})

    # {:noreply, socket
    # |> put_flash(:info, "balance has been successfully replenished with #{rubins_up} rubies")
    # |> push_redirect(to: socket.assigns.return_to)}
  end
end
