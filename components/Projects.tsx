"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  CubeIcon,
  NodesIcon,
  PipelineIcon,
  PlayIcon,
  SparkIcon,
  WaveIcon,
} from "@/components/SiteIcons";

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
};

const GITHUB_REPOS = [
  {
    name: "usdchat",
    description:
      "Conversational AI bot for OpenUSD that lets you interact with your USD Stage using natural language. Ask questions, query prims, and modify properties without writing USD Python.",
    stars: 31,
    language: "Python",
    url: "https://github.com/siva-nagendra/usdchat",
    demo: "https://youtu.be/9G0QUs5uoBg?si=gQCP8r6VzrL6JowH",
    topics: ["OpenUSD", "LLM", "Tool Calling"],
  },
  {
    name: "ai-render",
    description:
      "Applying Latent Consistency Model research inside Houdini for rapid AI-driven image generation within a production DCC environment.",
    stars: 0,
    language: "Jupyter Notebook",
    url: "https://github.com/siva-nagendra/ai-render",
    demo: "https://youtu.be/9P8vtf9dVwU?si=MVTGcSe9KSoq50Nn",
    topics: ["Houdini", "LCM", "Stable Diffusion"],
  },
  {
    name: "2D-Gaussian-Splatting",
    description:
      "Demystifying 2D Gaussian Splatting by simplifying the implementation, an educational deep-dive into Gaussian splat rendering.",
    stars: 0,
    language: "Jupyter Notebook",
    url: "https://github.com/siva-nagendra/2D-Gaussian-Splatting",
    topics: ["Gaussian Splatting", "Research"],
  },
];

type ProjectVisualKind = "chat" | "scene" | "mcp" | "studio" | "graph" | "render";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link?: string;
  demo?: string;
  accent: string;
  metric: string;
  visual: ProjectVisualKind;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "USD Chat",
    subtitle: "Conversational USD Stage Interface",
    description:
      "A conversational AI bot that lets you interact with USD Stage using natural language. Ask questions about your scene graph, query prims, modify properties, and traverse hierarchies without writing a single line of USD Python. Built on OpenUSD + LLM tool-calling. 31 GitHub stars.",
    tags: ["Python", "OpenUSD", "LLM", "Tool Calling"],
    link: "https://github.com/siva-nagendra/usdchat",
    demo: "https://youtu.be/9G0QUs5uoBg?si=gQCP8r6VzrL6JowH",
    accent: "#6ee7f7",
    metric: "31 GitHub stars",
    visual: "chat",
  },
  {
    id: 2,
    title: "Agentic 3D Scene Builder",
    subtitle: "C++ Unreal Engine Runtime",
    description:
      "An end-to-end agentic pipeline built in C++ inside Unreal Engine that constructs 3D scenes from a single user prompt or image. Combines Claude (Anthropic Agent SDK) with UE MCP, Gemini/Meshy/Tripo for mesh generation, Depth Pro for depth estimation, Grounding DINO for object detection, and SAM2 for segmentation. Mesh placement via custom raycasting + GLTF plugin. Designed to shorten the loop between concept intent, scene assembly, and in-engine iteration for production teams exploring AI-assisted world building.",
    tags: ["C++", "Unreal Engine", "Claude", "Gemini", "Depth Pro", "SAM2", "GLTF"],
    accent: "#a78bfa",
    metric: "Prompt to 3D scene",
    visual: "scene",
  },
  {
    id: 3,
    title: "MCP for Maya & Unreal Engine",
    subtitle: "Production MCP Deployment | Epic Games",
    description:
      "Designed and deployed Model Context Protocol servers for Maya and Unreal Engine, integrating Claude Code into Epic's live Fortnite asset pipeline. Among the earliest production MCP deployments at a major game studio, enabling LLM-driven pipeline automation across Modelling, Rigging, and Animation departments. The work focused on making AI assistance reliable inside real studio workflows, with tooling that respected production constraints instead of living only as a prototype.",
    tags: ["MCP", "Claude Code", "Maya", "Unreal Engine", "Python"],
    accent: "#34d399",
    metric: "Deployed in production",
    visual: "mcp",
  },
  {
    id: 4,
    title: "GenStudio",
    subtitle: "Internal Generative AI Product | Epic Games",
    description:
      "Contributed to GenStudio, an internal generative AI platform integrating Gemini, OpenAI image models, Meshy, Tripo, and Rodin mesh generation for AI-assisted 3D asset creation. Also implemented C2PA content provenance workflows ensuring cryptographic credential tracking for all AI-generated image outputs. This work helped connect model experimentation with safer, traceable, and production-aware tooling for internal creative teams.",
    tags: ["Gemini", "OpenAI", "Meshy", "Rodin", "C2PA", "Python"],
    accent: "#fb923c",
    metric: "Content provenance built in",
    visual: "studio",
  },
  {
    id: 5,
    title: "RAG Pipeline Assistant",
    subtitle: "Blueprint-Graph Generator",
    description:
      "A RAG-powered assistant that auto-generates visual workflow graphs (analogous to Unreal Engine Blueprints) from natural language queries. Custom RAG backend built on internal pipeline documentation, enabling artists and TDs to describe a workflow in plain English and receive a structured, executable graph. The goal was to turn buried knowledge into something operational, reducing the gap between documentation, onboarding, and everyday pipeline execution.",
    tags: ["RAG", "Python", "LLM", "Graph Generation", "Pipeline"],
    accent: "#f472b6",
    metric: "Text to executable graph",
    visual: "graph",
  },
  {
    id: 6,
    title: "AI Render | Houdini + LCM",
    subtitle: "Latent Consistency Models in Production DCC",
    description:
      "Applied Latent Consistency Model research directly inside Houdini, enabling rapid AI-driven image generation within a production DCC environment. Explored how LCMs could accelerate iterative look development and concept rendering workflows without leaving the 3D application.",
    tags: ["Houdini", "LCM", "Stable Diffusion", "Python", "PyTorch"],
    link: "https://github.com/siva-nagendra/ai-render",
    demo: "https://youtu.be/9P8vtf9dVwU?si=MVTGcSe9KSoq50Nn",
    accent: "#fbbf24",
    metric: "Research inside Houdini",
    visual: "render",
  },
];

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = parsed.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

function GridOverlay({ accent }: { accent: string }) {
  return (
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "38px 38px",
        backgroundPosition: "0 18px, 19px 0",
        boxShadow: `inset 0 0 90px ${accent}08`,
      }}
    />
  );
}

function CoverGlyph({ project, className }: { project: Project; className?: string }) {
  if (project.visual === "chat") return <NodesIcon className={className} />;
  if (project.visual === "scene") return <CubeIcon className={className} />;
  if (project.visual === "mcp") return <PipelineIcon className={className} />;
  if (project.visual === "studio") return <SparkIcon className={className} />;
  if (project.visual === "graph") return <NodesIcon className={className} />;
  return <WaveIcon className={className} />;
}

function StageTag({
  label,
  accent,
  className,
}: {
  label: string;
  accent: string;
  className: string;
}) {
  return (
    <div
      className={`motion-pill absolute rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] ${className}`}
      style={{
        borderColor: `${accent}2f`,
        background: "rgba(8, 12, 20, 0.42)",
        color: "rgba(226, 234, 248, 0.74)",
      }}
    >
      {label}
    </div>
  );
}

function ProjectArt({ project }: { project: Project }) {
  const accentGlow = {
    background: `
      radial-gradient(circle at 18% 16%, ${project.accent}30, transparent 24%),
      radial-gradient(circle at 78% 18%, rgba(255,255,255,0.05), transparent 18%),
      linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(6,9,16,0.92) 52%, rgba(6,9,16,0.98) 100%)
    `,
  };

  const pillStyle = {
    borderColor: `${project.accent}36`,
    background: `${project.accent}14`,
    color: project.accent,
  };

  const centerBadge = (
    <div
      className="motion-float motion-float-delay-1 absolute left-1/2 top-7 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-[1.45rem] border"
      style={{
        borderColor: `${project.accent}34`,
        background: `${project.accent}12`,
        boxShadow: `0 0 40px ${project.accent}12`,
        color: project.accent,
      }}
    >
      <CoverGlyph project={project} className="h-6 w-6" />
    </div>
  );

  return (
    <div className="relative h-56 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0" style={accentGlow} />
      <GridOverlay accent={project.accent} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] via-white/[0.015] to-transparent" />
      <div
        className="motion-ambient pointer-events-none absolute inset-x-8 top-5 h-20 opacity-80 blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.accent}24 0%, transparent 70%)`,
        }}
      />

      <div className="absolute left-4 top-4 z-20">
        <span
          className="motion-pill motion-glow rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]"
          style={pillStyle}
        >
          {project.metric}
        </span>
      </div>

      <div
        className="motion-float motion-float-delay-2 absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border"
        style={{
          borderColor: `${project.accent}2f`,
          background: `${project.accent}12`,
          color: project.accent,
        }}
      >
        <CoverGlyph project={project} className="h-5 w-5" />
      </div>

      <div className="absolute inset-x-6 top-[20%] z-10 h-[6.5rem]">

        {project.visual === "chat" && (
          <div className="relative h-full w-full">
            <StageTag label="USD Stage" accent={project.accent} className="left-0 top-2" />
            <StageTag label="Tool Call" accent={project.accent} className="right-0 top-2" />
            {centerBadge}
            <svg className="absolute inset-0 h-full w-full text-white/20" viewBox="0 0 100 100" fill="none">
              <path d="M50 28v17M50 45 31 82M50 45 69 82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M12 46h23M65 46h23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {project.visual === "scene" && (
          <div className="relative h-full w-full">
            <StageTag label="Prompt" accent={project.accent} className="left-0 top-2" />
            <StageTag label="Meshes" accent={project.accent} className="right-0 top-2" />
            {centerBadge}
            <svg className="absolute inset-0 h-full w-full text-white/20" viewBox="0 0 100 100" fill="none">
              <path d="M23 60h24l12-22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M77 38h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" />
            </svg>
          </div>
        )}

        {project.visual === "mcp" && (
          <div className="relative h-full w-full">
            <StageTag label="Maya" accent={project.accent} className="left-[2%] top-2" />
            <StageTag label="Claude" accent={project.accent} className="left-1/2 top-2 -translate-x-1/2" />
            <StageTag label="Unreal" accent={project.accent} className="right-[2%] top-2" />
            <div className="motion-float motion-float-delay-1 absolute left-1/2 top-7 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-[1.45rem] border border-white/10 bg-white/[0.02]">
              <PipelineIcon className="h-6 w-6 text-[color:var(--text-primary)] opacity-75" />
            </div>
            <svg className="absolute inset-0 h-full w-full text-white/18" viewBox="0 0 100 100" fill="none">
              <path d="M24 52h52" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
              <path d="M35 22v54M50 16v68M65 22v54" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {project.visual === "studio" && (
          <div className="relative h-full w-full">
            <div className="absolute left-[12%] top-4 h-20 w-16 rotate-[-8deg] rounded-[1.35rem] border border-white/10 bg-white/[0.05]" />
            <div className="absolute left-1/2 top-0 h-24 w-[4.8rem] -translate-x-1/2 rounded-[1.45rem] border border-white/10 bg-white/[0.06]" />
            <div className="absolute right-[12%] top-5 h-[4.6rem] w-16 rotate-[8deg] rounded-[1.35rem] border border-white/10 bg-white/[0.05]" />
            <div
              className="motion-pill motion-float absolute left-1/2 top-[72%] -translate-x-1/2 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
              style={pillStyle}
            >
              C2PA Provenance
            </div>
          </div>
        )}

        {project.visual === "graph" && (
          <div className="relative h-full w-full">
            <StageTag label="Docs" accent={project.accent} className="left-0 top-2" />
            <StageTag label="Graph Output" accent={project.accent} className="right-0 top-2" />
            {centerBadge}
            <svg className="absolute inset-0 h-full w-full text-white/22" viewBox="0 0 100 100" fill="none">
              <path d="M24 28h18l10 18h16l9 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M24 72h39l14-26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="24" cy="28" r="4" fill="currentColor" />
              <circle cx="42" cy="28" r="4" fill="currentColor" />
              <circle cx="52" cy="46" r="4" fill="currentColor" />
              <circle cx="68" cy="46" r="4" fill="currentColor" />
              <circle cx="77" cy="64" r="4" fill="currentColor" />
              <circle cx="24" cy="72" r="4" fill="currentColor" />
              <circle cx="63" cy="72" r="4" fill="currentColor" />
            </svg>
          </div>
        )}

        {project.visual === "render" && (
          <div className="relative h-full w-full">
            <StageTag label="Houdini" accent={project.accent} className="left-0 top-2" />
            <StageTag label="LCM" accent={project.accent} className="right-0 top-2" />
            <div
              className="absolute left-[9%] top-6 h-[4.4rem] w-28 rounded-[1.5rem]"
              style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.34), rgba(117,213,255,0.12))" }}
            />
            <div
              className="absolute right-[10%] top-6 h-20 w-[4.8rem] rounded-[1.5rem]"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(251,191,36,0.14))" }}
            />
            <div
              className="motion-float motion-float-delay-1 absolute left-1/2 top-7 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-[1.45rem] border"
              style={{
                borderColor: `${project.accent}34`,
                background: `${project.accent}12`,
                boxShadow: `0 0 40px ${project.accent}12`,
                color: project.accent,
              }}
            >
              <CoverGlyph project={project} className="h-6 w-6" />
            </div>
            <svg className="absolute inset-x-[16%] top-[66%] h-8 w-[68%] text-white/22" viewBox="0 0 100 24" fill="none">
              <path d="M1 15c8 0 8-10 16-10s8 10 16 10 8-10 16-10 8 10 16 10 8-10 16-10" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        )}
      </div>

        {project.visual === "chat" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

        {project.visual === "scene" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

        {project.visual === "mcp" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

        {project.visual === "studio" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

        {project.visual === "graph" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

        {project.visual === "render" && (
        <div className="motion-divider pointer-events-none absolute inset-x-0 bottom-[41%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(3, 7, 15, 0.82)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[calc(100svh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:max-h-[calc(100svh-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-end border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-subtle"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto">
          <ProjectArt project={project} />
          <div className="p-6 sm:p-8">

            <div className="text-xs font-medium uppercase tracking-[0.24em]" style={{ color: project.accent }}>
              {project.subtitle}
            </div>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fore">
              {project.title}
            </h3>
            {project.demo && (
              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-subtle">
                  <PlayIcon className="h-4 w-4" />
                  Project demo
                </div>
                <div className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(project.demo)}
                    title={`${project.title} demo`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
            <p className="mt-4 text-sm leading-7 text-subtle">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]"
                  style={{
                    borderColor: `${project.accent}28`,
                    background: `${project.accent}10`,
                    color: project.accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-fore"
                  style={{ color: project.accent }}
                >
                  View on GitHub
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-subtle transition-colors duration-200 hover:text-fore"
                >
                  <PlayIcon className="h-4 w-4" />
                  Watch demo
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-fore transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] sm:hidden"
            >
              Close project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Projects
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-fore sm:text-4xl">
              Systems work with real production weight
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-subtle">
              From conversational OpenUSD tooling to Unreal-native agentic runtime work,
              these projects sit at the boundary between research prototypes and shipping
              pipeline infrastructure.
            </p>
          </div>
          <a
            href="https://github.com/siva-nagendra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-subtle transition-colors duration-200 hover:text-fore"
          >
            github.com/siva-nagendra
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="motion-card project-card-shell group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface text-left hover:border-white/18 hover:shadow-[0_24px_80px_rgba(3,7,15,0.35)]"
            >
              <ProjectArt project={project} />
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-medium uppercase tracking-[0.24em]" style={{ color: project.accent }}>
                  {project.subtitle}
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-fore">{project.title}</h3>
                  <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fore" />
                </div>
                <p className="mt-3 min-h-[9rem] line-clamp-5 text-sm leading-6 text-subtle">
                  {project.description}
                </p>
                {project.demo && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                    <PlayIcon className="h-3.5 w-3.5" />
                    Demo available
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 border-t border-edge pt-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
                Open Source
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fore">
                GitHub repositories
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-subtle">
              Utilities, research experiments, and pipeline tools that show how I build outside
              the studio environment too.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GITHUB_REPOS.map((repo) => (
              <div
                key={repo.name}
                className="group flex flex-col rounded-[1.3rem] border border-white/10 bg-white/[0.025] p-5 transition-all duration-200 hover:border-white/18 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold tracking-[-0.02em] text-fore transition-colors duration-200 hover:text-accent"
                  >
                    {repo.name}
                  </a>
                  {repo.stars > 0 && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                      <span aria-hidden className="text-highlight">
                        ★
                      </span>
                      {repo.stars}
                    </span>
                  )}
                </div>
                <p className="mb-5 flex-1 text-sm leading-6 text-subtle">
                  {repo.description}
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: LANG_COLORS[repo.language] ?? "#888" }}
                      />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
                        {repo.language}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-subtle"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.18em]">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-subtle transition-colors duration-200 hover:text-fore"
                    >
                      View repo
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                    {repo.demo && (
                      <a
                        href={repo.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent transition-opacity duration-200 hover:opacity-80"
                      >
                        <PlayIcon className="h-3.5 w-3.5" />
                        Watch demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
