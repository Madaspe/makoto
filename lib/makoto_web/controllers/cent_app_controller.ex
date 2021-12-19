defmodule MakotoWeb.CentAppContorller do
  use MakotoWeb, :controller

  require Logger
  def index(conn, params) do
    Logger.info(inspect(params))
    text(conn, "ok")
  end

  def postback(conn, params = %{"SignatureValue" => signature_value, "custom" => custom, "Status" => status}) do
    case status do
      "SUCCESS" ->
        custom
        |> give_rubins
        text(conn, "ok")
      _ -> text(conn, "ok")
    end
  end

  defp give_rubins(params) do
    [user_id_binary, rubins_binary] = String.split(params, ":")

    user_id =
      String.to_integer(user_id_binary)

    rubins =
      String.to_integer(rubins_binary)

    user =
      Makoto.Accounts.get_user_by_id!(user_id)

    new_count_rubins =
        user.rubins + rubins

    if user.inviter_id do
      case Makoto.Accounts.get_user_by_id(user.inviter_id) do
        nil ->
          Makoto.Accounts.update_user(user, %{rubins: new_count_rubins})
        inviter ->
          rubins_for_inviter =
            rubins * inviter.referrals_procent
          Makoto.Accounts.update_user(user, %{rubins: new_count_rubins, rubins_for_inviter: rubins_for_inviter + user.rubins_for_inviter})
          Makoto.Accounts.update_user(inviter, %{rubins: inviter.rubins + rubins_for_inviter})
      end

      :ok
    else
      Makoto.Accounts.update_user(user, %{rubins: new_count_rubins, rubins_for_inviter: rubins * 0.15 + user.rubins_for_inviter})
      :ok
    end
  end
end
