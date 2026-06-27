"use client";

import { useActionState } from "react";
import { sendContactEmail } from "./actions";

type State = { success: true } | { error: string } | null;

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/60 transition-colors";

export function ContactForm() {
  const [state, action, pending] = useActionState<State, FormData>(
    sendContactEmail,
    null
  );

  if (state && "success" in state) {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="w-12 h-12 rounded-full border border-green-500/40 bg-green-500/10 flex items-center justify-center text-green-400 text-xl">
          ✓
        </div>
        <p className="text-white font-semibold">Message envoyé !</p>
        <p className="text-zinc-400 text-sm">Je te réponds dès que possible.</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="w-full max-w-lg mx-auto flex flex-col gap-4 text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs text-zinc-500 font-mono">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Alexis Gruny"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-zinc-500 font-mono">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="toi@exemple.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs text-zinc-500 font-mono">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Ton projet, ta mission..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {state && "error" in state && (
        <p className="text-rose-400 text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-center px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:-translate-y-0.5"
      >
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
