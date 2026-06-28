"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  description: string;
  stack: string[];
  mockupType: "chalet" | "pokemon";
  liveUrl?: string;
  githubUrl?: string;
};

type StackItem = {
  label: string;
  colorClass: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Chalet Site",
    description:
      "Site vitrine de location de chalet. Design épuré, performances optimisées et expérience utilisateur soignée.",
    stack: ["Next.js", "TypeScript"],
    mockupType: "chalet",
    liveUrl: "https://chalet-jaia-preview.vercel.app/",
    githubUrl: "https://github.com/alexisgruny/chalet-site"
  },
  {
    title: "Pokemon TCG",
    description:
      "App React/Node autour des cartes Pokémon. Browse, recherche et gestion de collection.",
    stack: ["React", "Node.js"],
    mockupType: "pokemon",
    liveUrl: "https://pokemonpockettrade.vercel.app/",
    githubUrl: "https://github.com/alexisgruny/Pokemon-tcg-test"
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
  email: "alexisgc.dev@gmail.com",
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < 60 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-xl"
          : ""
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-bold font-mono tracking-tight text-white hover:text-rose-400 transition-colors"
        >
          AG<span className="text-rose-500">.</span>
        </button>
        <div className="flex gap-1 text-sm text-zinc-400">
          {[
            { id: "about", label: "À propos" },
            { id: "projets", label: "Projets" },
            { id: "stack", label: "Stack" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

// ─── Project Mockup ───────────────────────────────────────────────────────────

const MOCKUP_CONFIG = {
  chalet: {
    src: "/DemoChaletJaia.png",
    alt: "Aperçu du site Chalet JAIA",
    url: "chalet-jaia-preview.vercel.app",
  },
  pokemon: {
    src: "/pokemonTgcp.png",
    alt: "Aperçu de l'app Pokémon TCG Trade",
    url: "pokemonpockettrade.vercel.app",
  },
} as const;

function ProjectMockup({ type }: { type: "chalet" | "pokemon" }) {
  const { src, alt, url } = MOCKUP_CONFIG[type];
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700/50 mb-5 select-none">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800/80 border-b border-zinc-700/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="flex-1 ml-2 h-4 rounded-sm bg-zinc-700/60 flex items-center px-2">
          <span className="text-[9px] text-zinc-500 font-mono">{url}</span>
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <article
      data-animate
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className="reveal group relative flex flex-col p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-rose-500/40 transition-colors duration-300 cursor-pointer"
      onClick={() => {
        if (project.liveUrl)
          window.open(project.liveUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <ProjectMockup type={project.mockupType} />

      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Code source — ${project.title}`}
            className="shrink-0 text-zinc-500 hover:text-white transition-colors pt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon />
          </a>
        )}
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />
    </article>
  );
}

// ─── Stack Badge ──────────────────────────────────────────────────────────────

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
      {/* Global noise texture */}
      <div
        aria-hidden="true"
        className="noise fixed inset-0 z-[2] pointer-events-none"
      />

      <Navbar />

      {/* ══════════════════════════════════════════════════════ HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center gap-5 max-w-3xl w-full">
          {/* Status + location badges */}
          <div
            className="animate-hero-in flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponible pour missions
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700/60 text-zinc-500 text-xs font-mono">
              🇯🇵 Tokyo • Remote
            </div>
          </div>

          <p
            className="animate-hero-in text-rose-400 text-xs font-mono tracking-[0.25em] uppercase"
            style={{ animationDelay: "0.1s" }}
          >
            Bonjour, je suis
          </p>

          {/* Letter-by-letter name */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none text-white"
            aria-label="Alexis Gruny"
          >
            {"Alexis Gruny".split("").map((char, i) => (
              <span
                key={i}
                className="animate-letter"
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            className="animate-hero-in text-zinc-500 text-sm sm:text-base italic"
            style={{ animationDelay: "0.95s" }}
          >
            Je construis des trucs sur internet le jour, je feed en ranked la
            nuit.
          </p>

          <p
            className="animate-hero-in text-zinc-200 text-lg sm:text-xl font-medium"
            style={{ animationDelay: "1.1s" }}
          >
            Développeur Web Fullstack — React, Next.js &amp; Node.js
          </p>

          <div
            className="animate-hero-in flex flex-wrap gap-4 justify-center mt-2"
            style={{ animationDelay: "1.25s" }}
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:-translate-y-0.5"
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
          style={{ animationDelay: "1.6s" }}
        >
          <div className="animate-bounce flex flex-col items-center gap-1">
            <span className="font-mono tracking-widest">scroll</span>
            <ChevronDownIcon />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ À PROPOS */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div data-animate className="reveal mb-6">
                <p className="text-rose-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">
                  À propos
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Qui suis-je ?
                </h2>
              </div>
              <div
                data-animate
                className="reveal space-y-4 text-zinc-400 leading-relaxed"
                style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
              >
                <p>
                  Développeur web fullstack basé à Tokyo. Je code des applis de
                  A à Z — de la DB à l&apos;interface — avec une obsession pour
                  les détails qui changent vraiment quelque chose.
                </p>
                <p>
                  React et Next.js au quotidien, Node.js côté back. J&apos;aime
                  les projets concrets avec de vraies contraintes, pas les PoC
                  qui restent dans un drawer.
                </p>
                <p className="text-zinc-500 text-sm italic border-l-2 border-rose-500/40 pl-4">
                  Le soir, je feed en ranked sur League of Legends. C&apos;est
                  pas glorieux, mais c&apos;est honnête.
                </p>
              </div>
            </div>

            {/* Terminal decoration */}
            <div
              data-animate
              className="reveal hidden lg:block"
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
            >
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-zinc-500 font-mono">
                    about.ts
                  </span>
                </div>
                <div className="p-5 font-mono text-xs leading-7">
                  <p>
                    <span className="text-rose-400">const</span>{" "}
                    <span className="text-cyan-300">dev</span>{" "}
                    <span className="text-zinc-400">=</span> {"{"}
                  </p>
                  <p className="ml-4">
                    <span className="text-zinc-400">name:</span>{" "}
                    <span className="text-green-300">&quot;Alexis Gruny&quot;</span>,
                  </p>
                  <p className="ml-4">
                    <span className="text-zinc-400">role:</span>{" "}
                    <span className="text-green-300">&quot;Fullstack Dev&quot;</span>,
                  </p>
                  <p className="ml-4">
                    <span className="text-zinc-400">location:</span>{" "}
                    <span className="text-green-300">&quot;Tokyo 🇯🇵&quot;</span>,
                  </p>
                  <p className="ml-4">
                    <span className="text-zinc-400">stack:</span> [
                  </p>
                  <p className="ml-8">
                    <span className="text-yellow-300">&quot;React&quot;</span>,{" "}
                    <span className="text-yellow-300">&quot;Next.js&quot;</span>,
                  </p>
                  <p className="ml-8">
                    <span className="text-yellow-300">&quot;Node.js&quot;</span>,{" "}
                    <span className="text-yellow-300">&quot;TypeScript&quot;</span>,
                  </p>
                  <p className="ml-4">],</p>
                  <p className="ml-4">
                    <span className="text-zinc-400">available:</span>{" "}
                    <span className="text-rose-300">true</span>,
                  </p>
                  <p className="ml-4 text-zinc-600">
                    {`// open to missions & CDI`}
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ PROJETS */}
      <section id="projets" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div data-animate className="reveal mb-14">
            <p className="text-rose-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">
              Projets
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ce que j&apos;ai construit
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ STACK */}
      <section id="stack" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
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

      {/* ══════════════════════════════════════════════════ CONTACT */}
      <section id="contact" className="py-28 px-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none"
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div data-animate className="reveal">
            <p className="text-rose-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">
              Contact
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold mb-5">
              Travaillons{" "}
              <span className="text-rose-400">
                ensemble
              </span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              Un projet en tête ? Une mission freelance ? Je suis disponible
              pour en parler.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ FOOTER */}
      <footer className="border-t border-zinc-800/60 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © 2026{" "}
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
