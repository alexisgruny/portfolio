"use client";

import { useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

type StackItem = {
  label: string;
  colorClass: string;
};

// ─── Data  ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Chalet Site",
    description: "Site vitrine de location de chalet.",
    stack: ["Next.js", "TypeScript"],
    liveUrl: undefined, // TODO: lien live
    githubUrl: undefined, // TODO: lien GitHub
  },
  {
    title: "Pokemon TCG",
    description: "App React/Node autour des cartes Pokémon.",
    stack: ["React", "Node.js"],
    liveUrl: undefined,
    githubUrl: undefined, // TODO: lien GitHub
  },
];

const STACK: StackItem[] = [
  {
    label: "React",
    colorClass:
      "border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200",
  },
  {
    label: "Next.js",
    colorClass:
      "border-zinc-500/40 text-zinc-200 hover:border-zinc-300 hover:text-white",
  },
  {
    label: "Node.js",
    colorClass:
      "border-green-500/40 text-green-300 hover:border-green-400 hover:text-green-200",
  },
  {
    label: "TypeScript",
    colorClass:
      "border-blue-500/40 text-blue-300 hover:border-blue-400 hover:text-blue-200",
  },
  {
    label: "JavaScript",
    colorClass:
      "border-yellow-500/40 text-yellow-300 hover:border-yellow-400 hover:text-yellow-200",
  },
  {
    label: "Git",
    colorClass:
      "border-orange-500/40 text-orange-300 hover:border-orange-400 hover:text-orange-200",
  },
  {
    label: "Tailwind",
    colorClass:
      "border-teal-500/40 text-teal-300 hover:border-teal-400 hover:text-teal-200",
  },
];

const CONTACT = {
  email: "alexis@gruny.dev",
  github: "https://github.com/alexisgruny",
  malt: "https://www.malt.fr/profile/alexisgruny",
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <article
      data-animate
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className="reveal group relative flex flex-col p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-violet-500/40 transition-colors duration-300"
    >
      {/* Title + link icons */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        {hasLinks && (
          <div className="flex shrink-0 gap-3 text-zinc-500 pt-0.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Code source — ${project.title}`}
                className="hover:text-white transition-colors"
              >
                <GitHubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Site live — ${project.title}`}
                className="hover:text-cyan-400 transition-colors"
              >
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover glow overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />
    </article>
  );
}

function StackBadge({ item, delay }: { item: StackItem; delay: number }) {
  return (
    <span
      data-animate
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className={`reveal px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-default hover:-translate-y-0.5 ${item.colorClass}`}
    >
      {item.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ══════════════════════════════════════════════════════ HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none"
        />
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center gap-5 max-w-3xl w-full">
          <p
            className="animate-hero-in text-violet-400 text-xs font-mono tracking-[0.25em] uppercase"
            style={{ animationDelay: "0.05s" }}
          >
            Bonjour, je suis
          </p>

          <h1
            className="animate-hero-in text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Alexis Gruny
            </span>
          </h1>

          <p
            className="animate-hero-in text-zinc-500 text-sm sm:text-base italic"
            style={{ animationDelay: "0.28s" }}
          >
            Je construis des trucs sur internet le jour, je feed en ranked la
            nuit.
          </p>

          <p
            className="animate-hero-in text-zinc-200 text-lg sm:text-xl font-medium"
            style={{ animationDelay: "0.4s" }}
          >
            Développeur Web Fullstack — React, Next.js &amp; Node.js
          </p>

          <div
            className="animate-hero-in flex flex-wrap gap-4 justify-center mt-2"
            style={{ animationDelay: "0.52s" }}
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
            >
              Me contacter
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden="true"
          className="animate-hero-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 text-xs"
          style={{ animationDelay: "1.1s" }}
        >
          <div className="animate-bounce flex flex-col items-center gap-1">
            <span className="font-mono tracking-widest">scroll</span>
            <ChevronDownIcon />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ PROJETS */}
      <section id="projets" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div data-animate className="reveal mb-14">
            <p className="text-violet-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">
              Projets
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ce que j&apos;ai construit
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ STACK */}
      <section id="stack" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div data-animate className="reveal mb-14">
            <p className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">
              Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Avec quoi je travaille
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {STACK.map((item, i) => (
              <StackBadge key={item.label} item={item} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ FOOTER */}
      <footer className="border-t border-zinc-800/60 py-10 px-6 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © 2025{" "}
            <span className="text-zinc-400 font-medium">Alexis Gruny</span>
          </p>

          <nav
            className="flex gap-6 text-sm text-zinc-500"
            aria-label="Liens sociaux"
          >
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={CONTACT.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Malt
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hover:text-white transition-colors"
            >
              {CONTACT.email}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
