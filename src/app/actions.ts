"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const rateLimitMap = new Map<string, number>();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ActionState = { success: true } | { error: string } | null;

export async function sendContactEmail(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const last = rateLimitMap.get(ip) ?? 0;
  if (now - last < 60_000) {
    return { error: "Attends une minute avant de renvoyer un message." };
  }
  rateLimitMap.set(ip, now);

  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name || !email || !message) {
    return { error: "Tous les champs sont requis." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { error: "Adresse email invalide." };
  }

  try {
    await resend.emails.send({
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
