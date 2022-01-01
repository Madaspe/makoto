defmodule MakotoWeb.UserCabinetLive.BuyStatusComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger


  @impl true
  def update(assigns, socket) do
    {:ok, socket |> assign(assigns) |> assign(:view_status_current, "vip")}
  end

  @impl true
  def handle_event("buy", params = %{"server" => server, "status" => status}, socket) do
    status =
      status
      |> String.to_integer

    name_status = %{
      6 => "vip",
      7 => "premium",
      8 => "optimum",
      9 => "ultimate"
    } |> Map.get(status)

    price =
      Application.get_env(:makoto, :status_prices)
      |> Map.get(status)

    user =
      socket.assigns.user

    if price > user.rubins do
      {:noreply, socket |> put_flash(:error, "Недостаточно рубинов")}
    else
      user
      |> Accounts.update_user(%{role: status, rubins: user.rubins - price, privilege_disable_time: DateTime.utc_now() |> DateTime.add(30 *  86400)})

      {:noreply, socket |> put_flash(:error, "Покупка прошла успешно")
      |> assign(:user, user)
      |> push_redirect(to: Routes.user_cabinet_index_path(socket, :index, user.username))}
    end
  end

  @impl true
  def handle_event(status, params, socket) do
     {:noreply, socket |> assign(:view_status_current, status)}
  end
end
