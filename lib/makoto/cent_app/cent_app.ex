defmodule Makoto.CentApp.Api do
    @centapp_api_url "https://cent.app/api/v1"

    require Logger

    def bill_create(params, user_id, rubins) do
      Logger.info(Poison.encode!(Map.merge(params, %{custom: "#{user_id}:#{rubins}", shop_id: Application.get_env(:makoto, :cent_app_shop_id)})))
        {:ok, %HTTPoison.Response{body: body}} =
          HTTPoison.post(
          @centapp_api_url <> "/bill/create",
          Poison.encode!(params),
          [
            "Authorization": "Bearer #{Application.get_env(:makoto, :cent_app_token)}",
            "Content-type": "application/json"
          ]
        )

        case Poison.decode(body) do
            {:ok, body} ->
              case body do
                %{"success" => false, "message" => message} ->
                  Logger.error(message)
                  body
                _ ->
                  body
              end
            {:error, error} ->
              Logger.error(error)
              %{"success" => false, "message" => ""}
        end
    end

end
