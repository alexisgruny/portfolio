"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < 60 || y < lastY.current);
      lastY.current = y;
      if (y > 60) setMenuOpen(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-zinc-800/50 bg-[#0a0a0a]/90 backdrop-blur-xl"
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

        {/* Desktop */}
        <div className="hidden md:flex gap-1 text-sm text-zinc-400">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-lg hover:bg-zinc-800/50 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 mx-auto bg-white transition-all duration-200 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 mx-auto bg-white transition-all duration-200 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 mx-auto bg-white transition-all duration-200 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="border-t border-zinc-800/50">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-full text-left px-6 py-4 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/30 active:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 last:border-b-0"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
