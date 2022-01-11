defmodule MakotoWeb.UserCabinetLive.BuyStatusComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger


  @impl true
  def update(assigns, socket) do

    {:ok, socket
    |> assign(assigns)
    |> assign(:view_status_current, "vip")
    |> assign(:servers_to_buy, assigns.servers |> Enum.map(fn server -> server.server.server_name end))
    |> assign(:time, ["30 дней", "60 дней", "90 дней", "Навсегда"])
    |> assign(:price, 99)
    |> assign(:time_for_validate, "30 дней")
    |> assign(:days, 30)}
  end

  @impl true
  def handle_event("buy", params = %{"servers" => %{"server" => server}, "times" => %{"time" => time}, "status" => status}, socket) do
    price =
      socket.assigns.price

    user =
      socket.assigns.user

    days =
      socket.assigns.days

    if price > user.rubins do
      {:noreply, socket |> clear_flash() |> put_flash(:error, "Недостаточно рубинов")}
    else
      {:ok, user} = user |> Accounts.update_user(%{rubins: user.rubins - price})

      user
      |> Ecto.build_assoc(:roles, %{name: status, privilege_disable_time: DateTime.utc_now() |> DateTime.add(days *  86400) |> DateTime.truncate(:second), server: server})
      |> Makoto.Repo.insert!()

      {:noreply, socket |> put_flash(:error, "Покупка прошла успешно")
      |> assign(:user, user)
      |> push_redirect(to: Routes.user_cabinet_index_path(socket, :index, user.username))}
    end
  end

  @impl true
  def handle_event("validate", params = %{"servers" => %{"server" => server}, "times" => %{"time" => time}, "status" => status}, socket) do
    {price, days} = get_price_status(status, time)
    {:noreply, socket |> clear_flash() |> assign(:price, price) |> assign(:time_for_validate, time) |> assign(:days, days)}
  end

  @impl true
  def handle_event(status, params, socket) do
    {price, days} = get_price_status(status, socket.assigns.time_for_validate || "30 дней")
     {:noreply, socket |> clear_flash() |> assign(:view_status_current, status) |> assign(:price, price) |> assign(:days, days)}
  end

  defp get_price_status(status_name, days) do
    %{
      ["vip", "30 дней"] => {99, 30},
      ["vip", "60 дней"] => {169, 60},
      ["vip", "90 дней"] => {249, 90},
      ["vip", "Навсегда"] => {990, 365 * 50},

      ["premium", "30 дней"] => {299, 30},
      ["premium", "60 дней"] => {539, 60},
      ["premium", "90 дней"] => {799, 90},
      ["premium", "Навсегда"] => {2990, 365 * 50},

      ["optimum", "30 дней"] => {699, 30},
      ["optimum", "60 дней"] => {1199, 60},
      ["optimum", "90 дней"] => {1799, 90},
      ["optimum", "Навсегда"] => {6990, 365 * 50},

      ["ultimate", "30 дней"] => {990, 30},
      ["ultimate", "60 дней"] => {2990, 60},
      ["ultimate", "90 дней"] => {6990, 90},
      ["ultimate", "Навсегда"] => {9990, 365 * 50}
    } |> Map.get([status_name, days])
  end
end
