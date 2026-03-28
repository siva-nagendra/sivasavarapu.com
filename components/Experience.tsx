"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const JOBS = [
  {
    company: "Epic Games",
    role: "Senior Pipeline Engineer",
    period: "May 2025 - Mar 2026",
    location: "Vancouver, Canada",
    highlights: [
      "Fortnite asset pipeline spanning Modelling, Texturing, Rigging, and Animation with Python/C++ tools across Maya and UE",
      "Deployed MCP servers for Maya and Unreal Engine, integrating Claude Code into Epic's production pipeline",
      "Built agentic C++ UE Runtime combining Claude, Gemini, Depth Pro, Grounding DINO, and SAM2",
      "Contributed to GenStudio internal GenAI product; implemented C2PA content provenance workflows",
      "Built RAG-powered pipeline assistant that auto-generates visual workflow graphs",
    ],
    color: "#6ee7f7",
    productions: [],
  },
  {
    company: "Sony Pictures Imageworks",
    role: "Senior Software Engineer",
    period: "Jul 2023 - May 2025",
    location: "Vancouver, Canada",
    highlights: [
      "Engineered OpenUSD + Alembic-based asset transfer pipeline from Houdini to Unreal Engine",
      "Built and maintained OpenUSD pipelines for VFX and Animation productions (Python, C++, PySide6)",
      "DCC integrations across Maya, Houdini, and Unreal Engine ensuring cross-studio pipeline interop",
    ],
    color: "#a78bfa",
    productions: ["Fantastic Four: First Steps", "KPop Demon Hunters"],
  },
  {
    company: "Animal Logic",
    role: "Core Assets Pipeline Technical Director",
    period: "Aug 2021 - May 2023",
    location: "Sydney, Australia",
    highlights: [
      "Developed core Asset Pipeline systems using Pixar's USD, Houdini, Maya, and Python",
      "USD schema extensions, pipeline plugin development, and UsdShade material workflows",
      "Contributed heavily to USD texture/material workflows for the ALab public dataset release",
    ],
    color: "#34d399",
    productions: ["ALab Public Dataset"],
  },
  {
    company: "MPC Film",
    role: "Technical Director",
    period: "Nov 2018 - Jul 2021",
    location: "Bangalore, India",
    highlights: [
      "Built Real-Time Asset presentation pipeline in Unreal Engine",
      "Developed MPC's core production pipeline tools in Python and PySide6",
      "Built ION containers for reproducible software environments across shows",
    ],
    color: "#fb923c",
    productions: ["WandaVision", "Top Gun: Maverick"],
  },
  {
    company: "Rhythm & Hues / Prana Studios",
    role: "Texture & Lookdev Artist",
    period: "Sep 2015 - Nov 2018",
    location: "Mumbai, India",
    highlights: [
      "Lookdev and Lighting workflows with ImageEngine's Gaffer",
      "Trained team in Gaffer, Substance Painter, and Mari",
      "Unreal Engine and Unity for Previz and real-time VR",
    ],
    color: "#f472b6",
    productions: ["Hellboy (2019)", "2.0 (2019)", "Fear the Walking Dead"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          x: -30, opacity: 0, duration: 0.8, ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-kicker text-xs tracking-widest uppercase mb-4 text-accent">
          Experience
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-16">10 Years at Top Studios</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="motion-divider absolute bottom-2 left-0 top-2 hidden w-px bg-edge sm:block" />

          <div className="flex flex-col gap-14">
            {JOBS.map((job, i) => (
              <div
                key={job.company}
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className="sm:pl-10 relative"
              >
                {/* Timeline dot, suppressHydrationWarning: dynamic hex background color */}
                <div
                  className="motion-glow absolute left-0 top-2 hidden h-2.5 w-2.5 -translate-x-[4px] rounded-full ring-1 ring-offset-2 ring-offset-bg sm:block"
                  style={{ background: job.color }}
                  suppressHydrationWarning
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    {/* suppressHydrationWarning: dynamic hex color */}
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: job.color }}
                      suppressHydrationWarning
                    >
                      {job.company}
                    </span>
                    <h3 className="text-lg font-semibold mt-0.5">{job.role}</h3>
                  </div>
                  <div className="text-xs text-right text-subtle">
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>

                <ul className="mt-3 flex flex-col gap-2">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm leading-6 flex gap-2 text-subtle"
                    >
                      {/* suppressHydrationWarning: dynamic hex color */}
                      <span style={{ color: job.color }} aria-hidden suppressHydrationWarning>
                        &rsaquo;
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                {job.productions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.productions.map((p) => (
                      // suppressHydrationWarning: dynamic hex color
                      <span
                        key={p}
                        className="motion-pill text-xs px-2 py-0.5 rounded-full transition-all duration-200 hover:brightness-125"
                        style={{ background: `${job.color}12`, color: job.color }}
                        suppressHydrationWarning
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
