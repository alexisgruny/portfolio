"use client";

import { useEffect, useRef, useState } from "react";

export function Navbar() {
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
