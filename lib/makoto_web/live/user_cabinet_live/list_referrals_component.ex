defmodule MakotoWeb.UserCabinetLive.ListReferralsComponent do
  use MakotoWeb, :live_component

  require Logger

  @impl true
  def update(assigns, socket) do
    Logger.info inspect(socket)
    
    refs =
      assigns.user.id
      |> Makoto.Accounts.get_all_referrals

    {:ok, socket |> assign(assigns) |> assign(:refs, refs)}
  end

  @impl true
  def handle_params(params, _, socket) do
    {:noreply,
     socket |> assign(:page, params.page)}
  end
end
