defmodule MakotoMinecraft.Minecraft do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias MakotoMinecraft.Repo
  require Logger
  def get_online(username), do: MakotoMinecraft.Minecraft.Info |> where(player: ^username) |> Repo.all()
end
