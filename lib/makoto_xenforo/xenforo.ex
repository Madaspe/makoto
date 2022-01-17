defmodule MakotoXenForo.XenForo do
  @xenforo_api "https://forum.optimine.su/index.php?api"

  def create_forum_user(user) do
    {:ok, %HTTPoison.Response{body: body}} =
      HTTPoison.post(
      @xenforo_api <> "/users",
      URI.encode_query(Map.take(user, [:username, :password, :email])),
      [
        "XF-Api-Key": "#{Application.get_env(:makoto, :xenforo_token)}",
        "Content-type": "application/x-www-form-urlencoded",
        "XF-Api-User": "1"
      ]
    )

    case Poison.decode(body) do
        {:ok, body} ->
          case body do
            %{"success" => false, "message" => _message} ->
              body
            _ ->
              body
          end
        {:error, _error} ->
          %{"success" => false, "message" => ""}
    end
  end

  def find_forum_user_by_username(username) do
    {:ok, %HTTPoison.Response{body: body}} =
      HTTPoison.get(
      @xenforo_api <> "/users/find-name&" <>
      URI.encode_query(%{username: username}),
      [
        "XF-Api-Key": "#{Application.get_env(:makoto, :xenforo_token)}",
        "Content-type": "application/x-www-form-urlencoded",
        "XF-Api-User": "1"
      ]
    )

    case Poison.decode(body) do
        {:ok, body} ->
          case body do
            %{"success" => false, "message" => _message} ->
              body
            _ ->
              body
          end
        {:error, _error} ->
          %{"success" => false, "message" => ""}
    end
  end

  def update_forum_avatar(%{"user" => %{"user_id" => user_id}}, %{avatar_url: avatar_path}) do
    case avatar_path do
      nil ->
        nil
      avatar_path ->
        update_avatar_by_user_id(user_id, avatar_path)
    end
  end

  def update_avatar_by_user_id(user_id, avatar_path) do
    {:ok, %HTTPoison.Response{body: body}} =
      HTTPoison.post(
      @xenforo_api <> "/users/#{user_id}/avatar",
      {:multipart, [{:file, "priv/static#{avatar_path}", {"form-data", [name: "avatar", filename: parse_file_name(avatar_path)]}, []}]},
      [
        "XF-Api-Key": "#{Application.get_env(:makoto, :xenforo_token)}",
        "Content-type": "application/x-www-form-urlencoded",
        "XF-Api-User": "1"
      ]
    )

    case Poison.decode(body) do
        {:ok, body} ->
          case body do
            %{"success" => false, "message" => _message} ->
              body
            _ ->
              body
          end
        {:error, _error} ->
          %{"success" => false, "message" => ""}
    end
  end

  def update_avatar_by_username(username, avatar_path) do
    user_id = find_forum_user_by_username(username)["exact"]["user_id"]
    update_avatar_by_user_id(user_id, avatar_path)
  end

  def update_user_by_username(username, updates) do
    user_id = find_forum_user_by_username(username)["exact"]["user_id"]

    {:ok, %HTTPoison.Response{body: body}} =
      HTTPoison.post(
      @xenforo_api <> "/users/#{user_id}",
      URI.encode_query(updates),
      [
        "XF-Api-Key": "#{Application.get_env(:makoto, :xenforo_token)}",
        "Content-type": "application/x-www-form-urlencoded",
        "XF-Api-User": "1"
      ]
    )

    case Poison.decode(body) do
        {:ok, body} ->
          case body do
            %{"success" => false, "message" => _message} ->
              body
            _ ->
              body
          end
        {:error, _error} ->
          %{"success" => false, "message" => ""}
    end
  end

  def auth_forum_by_username(username, params \\ %{return_url: "http://localhost:4000/lk"}) do
    auth_forum_by_id(find_forum_user_by_username(username)["exact"]["user_id"], params)
  end

  def auth_forum_by_id(id, params \\ %{return_url: "http://localhost:4000/lk"}) do
    {:ok, %HTTPoison.Response{body: body}} =
      HTTPoison.post(
      @xenforo_api <> "/auth/login-token",
      URI.encode_query(Map.merge(params, %{user_id: id})),
      [
        "XF-Api-Key": "#{Application.get_env(:makoto, :xenforo_token)}",
        "Content-type": "application/x-www-form-urlencoded",
        "XF-Api-User": "1"
      ]
    )

    case Poison.decode(body) do
        {:ok, body} ->
          case body do
            %{"success" => false, "message" => _message} ->
              body
            _ ->
              body
          end
        {:error, _error} ->
          %{"success" => false, "message" => ""}
    end
  end

  defp parse_file_name(path) do
    path |> URI.parse() |> Map.fetch!(:path) |> Path.basename()
  end
end
