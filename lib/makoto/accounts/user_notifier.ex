defmodule Makoto.Accounts.UserNotifier do
  import Swoosh.Email

  alias Makoto.Mailer

  # Delivers the email using the application mailer.
  defp deliver(recipient, subject, body) do
    email =
      new()
      |> to(recipient)
      |> from({"Optimine", "no-reply@optimine.su"})
      |> subject(subject)
      |> text_body(body)

    with {:ok, _metadata} <- Mailer.deliver(email) do
      {:ok, email}
    end
  end

  @doc """
  Deliver instructions to confirm account.
  """
  def deliver_confirmation_instructions(user, url) do
    deliver(user.email, "Confirmation instructions", """

    ==============================

    Привет #{user.username},

    Ты можешь подтвердить свою почту по ссылке ниже:

    #{url}

    ==============================
    """)
  end

  @doc """
  Deliver instructions to reset a user password.
  """
  def deliver_reset_password_instructions(user, url) do
    deliver(user.email, "Reset password instructions", """

    ==============================

    Привет #{user.username},

    Ты можешь сбросить свой пароль по ссылке ниже:

    #{url}

    ==============================
    """)
  end

  @doc """
  Deliver instructions to update a user email.
  """
  def deliver_update_email_instructions(user, url) do
    deliver(user.email, "Update email instructions", """

    ==============================

    Привет #{user.username},

    Ты можешь поменять свою почту по ссылке ниже:

    #{url}

    ==============================
    """)
  end
end
