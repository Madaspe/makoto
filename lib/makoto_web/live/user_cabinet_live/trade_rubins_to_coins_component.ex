defmodule MakotoWeb.UserCabinetLive.TradeRubinsToCoinsComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts
  alias Makoto.Accounts.User

  require Logger

  @impl true
  def update(assigns, socket) do
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
      url = "http://#{Application.get_env(:makoto, :rcon_host)}:#{Application.get_env(:makoto, :rcon_port)}/console?command=eco%20give%20#{user.username}%20add%20#{sum * 100}"
      case HTTPoison.get(url) do
          {:ok, %HTTPoison.Response{body: body}} ->
            {:ok, user} =
              user
              |> Accounts.update_user(%{rubins: user.rubins - sum})

             {:noreply, socket |> put_flash(:info, "Успешно") |> assign(:rubins_count, 1)
              |> assign(:user, user)
              |> push_redirect(to: Routes.user_cabinet_index_path(socket, :index, user.username))}
          _ ->
            Logger.error("Error buy status #{url}")
            {:noreply, socket |> put_flash(:error, "Обратитесь к администрации проекта")}
      end
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
