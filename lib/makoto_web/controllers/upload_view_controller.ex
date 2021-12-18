defmodule MakotoWeb.UploadViewController do
  use MakotoWeb, :controller

  require Logger
  require ExImageInfo
  def index(conn, params = %{"filename" => filename}) do

    path = "priv/static/uploads/#{filename}"
    if File.exists?(path) do
      file = File.read!(path)

      {mime_type, _type} = ExImageInfo.type(file)

      conn
      |> put_resp_content_type(mime_type)
      |> send_resp(200, file)
    else
      case check_file_name_for_skin(filename) do
        false ->
          conn
          |> send_resp(404, "Not found")
        true ->
          file = File.read!("priv/static/uploads/steave.png")

          {mime_type, _type} = ExImageInfo.type(file)

          conn
          |> put_resp_content_type(mime_type)
          |> send_resp(200, file)
      end
    end
  end


  defp check_file_name_for_skin(filename) do
    filename
    |> String.contains?("_skin")
  end
end
