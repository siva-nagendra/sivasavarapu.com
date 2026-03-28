"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    label: "Languages",
    color: "#6ee7f7",
    skills: ["Python", "C++", "MEL", "JavaScript", "TypeScript"],
  },
  {
    label: "AI / ML",
    color: "#a78bfa",
    skills: [
      "PyTorch", "TensorFlow", "Deep Learning", "Model Training",
      "Computer Vision", "Multimodal AI", "LLM Integration", "RAG",
      "MCP", "Stable Diffusion", "Grounding DINO", "Depth Pro",
      "SAM2", "VAE", "Diffusion Models", "C2PA",
    ],
  },
  {
    label: "AI APIs & SDKs",
    color: "#34d399",
    skills: ["Anthropic Agent SDK", "Claude Code", "OpenAI API", "Gemini API", "Meshy", "Tripo", "Rodin"],
  },
  {
    label: "Pipeline & DCCs",
    color: "#fb923c",
    skills: [
      "OpenUSD", "OpenAssetIO", "ShotGrid",
      "Maya", "Houdini", "Unreal Engine",
      "Nuke", "Gaffer", "Alembic",
    ],
  },
  {
    label: "Rendering & Real-Time",
    color: "#fbbf24",
    skills: ["UE5", "PBR Workflows", "Arnold", "Renderman", "Substance Painter", "Substance Designer", "Virtual Production"],
  },
  {
    label: "Tools & Frameworks",
    color: "#f472b6",
    skills: ["PySide6 / Qt6", "Git", "GitHub", "Docker", "GLTF", "Web Frameworks"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(groupsRef.current?.children ?? [], {
        scrollTrigger: { trigger: groupsRef.current, start: "top 80%", once: true },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-kicker text-xs tracking-widest uppercase mb-4 text-accent">
          Skills
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-16">Technical Toolkit</h2>

        <div ref={groupsRef} className="flex flex-col gap-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              {/* suppressHydrationWarning: dynamic hex color */}
              <h3
                className="motion-glow text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: group.color }}
                suppressHydrationWarning
              >
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  // suppressHydrationWarning: dynamic hex color used in border/background
                  <span
                    key={skill}
                    className="motion-pill px-3 py-1.5 text-sm rounded-full border transition-all duration-200 text-fore hover:scale-[1.03] hover:brightness-110 cursor-default"
                    style={{
                      borderColor: `${group.color}30`,
                      background: `${group.color}08`,
                    }}
                    suppressHydrationWarning
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
