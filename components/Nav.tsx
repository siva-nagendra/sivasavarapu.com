"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Artwork", href: "#artwork" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,7,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
      suppressHydrationWarning
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="inline-flex items-center gap-3 text-fore transition-opacity duration-200 hover:opacity-90"
        >
          <span className="motion-divider h-px w-8 bg-gradient-to-r from-accent via-accent/70 to-transparent" />
          <span className="motion-glow text-[12px] font-bold uppercase tracking-[0.32em] text-accent drop-shadow-[0_0_18px_rgba(117,213,255,0.18)]">
            AI x 3D Pipelines
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm transition-colors duration-200 hover:text-fore ${
                  active === link.href.slice(1) ? "text-accent" : "text-subtle"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:siva_nagendra@outlook.com"
          className="motion-pill hidden md:inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-xs font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
          </span>
          Open to work · Vancouver / Sydney
        </a>
      </nav>
    </header>
  );
}
