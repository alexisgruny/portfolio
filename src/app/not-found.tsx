import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden="true"
        className="noise fixed inset-0 z-[2] pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-rose-400 text-xs font-mono tracking-[0.25em] uppercase">
          Erreur 404
        </p>
        <h1 className="text-8xl sm:text-[10rem] font-bold leading-none text-white">
          404
        </h1>
        <p className="text-zinc-400 max-w-xs leading-relaxed">
          Cette page n&apos;existe pas. Tu t&apos;es peut-être perdu.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:-translate-y-0.5"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
