defmodule Makoto.Utils.Xlsx.Parse do
  import XlsxReader

  def parse_xlsx_for_shop(xlsx_path) do
    {:ok, pack} = XlsxReader.open(xlsx_path)

    sheet_names(pack)
    |> Enum.map(fn sheet_name ->
      {:ok, rows} = sheet(pack, sheet_name)

      %{rows: rows, mod: sheet_name}
    end)
  end
end
