"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionState = { success: true } | { error: string } | null;

export async function sendContactEmail(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name || !email || !message) {
    return { error: "Tous les champs sont requis." };
  }

  try {
    await resend.emails.send({
      // Remplace par ton domaine vérifié sur resend.com une fois ajouté
      from: "Portfolio <onboarding@resend.dev>",
      to: "alexisgc.dev@gmail.com",
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de l'envoi. Réessaie plus tard." };
  }
}
