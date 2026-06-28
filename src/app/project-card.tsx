"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  mockupType: "chalet" | "pokemon";
  liveUrl?: string;
  githubUrl?: string;
};

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
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800/80 border-b border-zinc-700/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="flex-1 ml-2 h-4 rounded-sm bg-zinc-700/60 flex items-center px-2">
          <span className="text-[9px] text-zinc-500 font-mono">{url}</span>
        </div>
      </div>
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

export function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <article
      data-animate
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
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
