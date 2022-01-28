defmodule MakotoWeb.ShopAssistentLive.FormComponent do
  use MakotoWeb, :live_component

  @impl true
  def update(assigns = %{item: item}, socket) do
    changeset = MakotoMinecraft.Minecraft.Item.changeset(item, %{})

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}

  end
  
  @impl true
  def handle_event("validate", %{"item" => item_params}, socket) do
    changeset =
      socket.assigns.item
      |> MakotoMinecraft.Minecraft.Item.changeset(item_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save",  %{"item" => item_params}, socket) do
    save_item(socket, :edit, item_params)
  end

  defp save_item(socket, :edit, item_params) do
    case Makoto.Shop.update_item(socket.assigns.item, item_params) do
      {:ok, _} ->
        {:noreply,
         socket
         |> put_flash(:info, "Успешно")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end
end
