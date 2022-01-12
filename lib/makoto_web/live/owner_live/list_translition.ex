defmodule MakotoWeb.OwnerLive.ShowTranslitions do
  use MakotoWeb, :live_view

  alias Makoto.Logs
  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket |> assign(:logs, Logs.get_all_transitions_logs())}
  end

  @impl true
  def handle_params(params, _, socket) do
    {:noreply,
     socket}
  end
end
