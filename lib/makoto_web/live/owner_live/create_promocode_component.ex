defmodule MakotoWeb.OwnerLive.CreatePromocodeComponent do
  use MakotoWeb, :live_component

  alias Makoto.Accounts

  require Logger
  @impl true
  def update(assigns, socket) do
    promocode_changeset =
      %Makoto.Accounts.Promocode{}
      |> Accounts.change_promocode
    {:ok,
     socket
    |> assign(:changeset, promocode_changeset)
     |> assign(assigns)}
  end

  def handle_event("save", %{"promocode" => promocode}, socket) do
    case Accounts.create_promocode(promocode) do
      {:ok, _promocode} ->
        {:noreply,
         socket
         |> put_flash(:info, "Успешно")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end
end
