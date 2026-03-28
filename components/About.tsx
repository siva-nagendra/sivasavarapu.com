"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STUDIOS = [
  { name: "Epic Games", years: "2025-2026" },
  { name: "Sony Pictures Imageworks", years: "2023-2025" },
  { name: "Animal Logic", years: "2021-2023" },
  { name: "MPC Film", years: "2018-2021" },
  { name: "Rhythm & Hues", years: "2015-2018" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const studiosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: textRef.current, start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(studiosRef.current?.children ?? [], {
        scrollTrigger: { trigger: studiosRef.current, start: "top 85%", once: true },
        y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-kicker text-xs tracking-widest uppercase mb-4 text-accent">
          About
        </p>

        <div ref={textRef}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-snug">
            10+ years building pipeline systems
            <br />
            at the intersection of AI and 3D production
          </h2>
          <p className="text-base leading-8 mb-4 text-subtle">
            I build the infrastructure that makes VFX films and games ship. From
            OpenUSD asset pipelines at Animal Logic to deploying Model Context
            Protocol servers inside Epic Games&apos; live Fortnite pipeline, I work
            where engineering complexity meets creative scale.
          </p>
          <p className="text-base leading-8 text-subtle">
            At Epic, I was among the first engineers to bring MCP into production at a
            major game studio and independently built an agentic C++ Unreal Engine
            runtime combining Claude, Gemini, Depth Pro, Grounding DINO, and SAM2
            into a single prompt-driven 3D scene construction system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/in/sivanagendra"
              target="_blank"
              rel="noopener noreferrer"
              className="motion-pill inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg"
            >
              Connect on LinkedIn
              <span aria-hidden>↗</span>
            </a>
            <a
              href="mailto:siva_nagendra@outlook.com"
              className="motion-pill inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-fore"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div ref={studiosRef} className="mt-16 flex flex-wrap gap-3">
          {STUDIOS.map((s) => (
            <div
              key={s.name}
              className="motion-card rounded-lg border border-edge bg-surface px-4 py-3 text-sm"
            >
              <span className="font-semibold block">{s.name}</span>
              <span className="text-xs text-subtle">{s.years}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
