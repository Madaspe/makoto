defmodule Makoto.Repo.Migrations.AddUBTInIntemsAndMime do
  use Ecto.Migration

  def change do
    alter table(:shop_items) do
      add :NBT, :string
      add :mime_type, :string
      add :item_image_path, :string
    end
  end
end
