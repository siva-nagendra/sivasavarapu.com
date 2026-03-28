"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  ImdbIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/SiteIcons";

gsap.registerPlugin(ScrollTrigger);

const TAGS = [
  "OpenUSD",
  "Unreal Engine",
  "PyTorch",
  "TensorFlow",
  "Computer Vision",
  "Agentic AI",
  "RAG Systems",
];

const FACTS = [
  { value: "10+", label: "years building production pipelines" },
  { value: "5", label: "top VFX and game studios" },
  { value: "AI x 3D", label: "from research to deployed tools" },
];

const STUDIOS = ["Epic Games", "Sony Pictures Imageworks", "Animal Logic", "MPC Film"];
const HERO_SUBTEXT =
  "Senior Pipeline Engineer building production-grade OpenUSD, Unreal Engine, and generative AI workflows for films, games, and 3D content teams.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const photoPlaneRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailLayerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupDepth = () => {};

    const ctx = gsap.context(() => {
      const nameLines = headingRef.current?.querySelectorAll("[data-hero-line-wrap]") ?? [];
      const subChars = subRef.current?.querySelectorAll("[data-hero-sub-char]") ?? [];

      gsap.set(headingRef.current, {
        transformPerspective: 1200,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
      });
      gsap.set(panelRef.current, {
        transformPerspective: 1500,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { y: 18, opacity: 0, duration: 0.7 })
        .from(nameLines, {
          yPercent: 115,
          opacity: 0,
          stagger: 0.12,
          duration: 0.95,
        }, "-=0.35")
        .from(subChars, {
          opacity: 0,
          y: 10,
          filter: "blur(5px)",
          stagger: 0.008,
          duration: 0.32,
          ease: "power2.out",
        }, "-=0.42")
        .from(imageRef.current, { x: 28, opacity: 0, duration: 0.95 }, "-=0.45")
        .from(ctasRef.current?.children ?? [], { y: 16, opacity: 0, duration: 0.65 }, "-=0.55")
        .from(factsRef.current?.children ?? [], { y: 18, opacity: 0, stagger: 0.08, duration: 0.65 }, "-=0.35")
        .from(tagsRef.current?.children ?? [], { y: 14, opacity: 0, stagger: 0.05, duration: 0.55 }, "-=0.35")
        .from(detailRef.current?.children ?? [], { y: 16, opacity: 0, stagger: 0.08, duration: 0.65 }, "-=0.5")
        .from(scrollRef.current, { opacity: 0, duration: 0.8 }, "-=0.2");

      const section = sectionRef.current;
      if (!section || !headingRef.current || !panelRef.current || !photoPlaneRef.current || !detailLayerRef.current) return;

      const setPanelRotationX = gsap.quickTo(panelRef.current, "rotationX", { duration: 0.55, ease: "power3.out" });
      const setPanelRotationY = gsap.quickTo(panelRef.current, "rotationY", { duration: 0.55, ease: "power3.out" });
      const setPanelX = gsap.quickTo(panelRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const setPanelY = gsap.quickTo(panelRef.current, "y", { duration: 0.6, ease: "power3.out" });
      const setPhotoX = gsap.quickTo(photoPlaneRef.current, "x", { duration: 0.5, ease: "power3.out" });
      const setPhotoY = gsap.quickTo(photoPlaneRef.current, "y", { duration: 0.5, ease: "power3.out" });
      const setDetailX = gsap.quickTo(detailLayerRef.current, "x", { duration: 0.38, ease: "power3.out" });
      const setDetailY = gsap.quickTo(detailLayerRef.current, "y", { duration: 0.38, ease: "power3.out" });

      const handleMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const nx = px - 0.5;
        const ny = py - 0.5;

        setPanelRotationX(-ny * 5);
        setPanelRotationY(nx * 7);
        setPanelX(nx * 8);
        setPanelY(ny * 6);
        setPhotoX(nx * 3.5);
        setPhotoY(ny * 3);
        setDetailX(nx * -1.75);
        setDetailY(ny * -1.2);

        section.style.setProperty("--hero-flare-x", `${px * 100}%`);
        section.style.setProperty("--hero-flare-y", `${py * 100}%`);
      };

      const handleLeave = () => {
        setPanelRotationX(0);
        setPanelRotationY(0);
        setPanelX(0);
        setPanelY(0);
        setPhotoX(0);
        setPhotoY(0);
        setDetailX(0);
        setDetailY(0);

        section.style.setProperty("--hero-flare-x", "50%");
        section.style.setProperty("--hero-flare-y", "22%");
      };

      section.addEventListener("pointermove", handleMove);
      section.addEventListener("pointerleave", handleLeave);

      cleanupDepth = () => {
        section.removeEventListener("pointermove", handleMove);
        section.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => {
      cleanupDepth();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-depth-stage relative isolate overflow-hidden"
      style={
        {
          "--hero-flare-x": "50%",
          "--hero-flare-y": "22%",
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(117, 213, 255, 0.12), transparent 30%),
            radial-gradient(circle at 82% 14%, rgba(246, 197, 110, 0.14), transparent 18%),
            radial-gradient(circle at 70% 70%, rgba(41, 78, 138, 0.12), transparent 28%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 6, 12, 0.18) 0%, rgba(4, 6, 12, 0.46) 44%, rgba(4, 6, 12, 0.10) 100%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl gap-14 px-6 pb-12 pt-28 [perspective:1800px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative z-10 max-w-3xl">
          <h1
            ref={headingRef}
            className="hero-name hero-chromatic max-w-[11ch] text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-fore sm:text-6xl lg:text-[6.25rem]"
          >
            <span className="hero-name-line" data-hero-line-wrap>
              <span data-hero-line data-text="Siva" className="block">Siva</span>
            </span>
            <span className="hero-name-line" data-hero-line-wrap>
              <span data-hero-line data-text="Nagendra" className="block">Nagendra</span>
            </span>
            <span className="hero-name-line" data-hero-line-wrap>
              <span data-hero-line data-text="Savarapu" className="block text-accent">Savarapu</span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-2xl text-lg leading-8 text-subtle sm:text-xl"
            aria-label={HERO_SUBTEXT}
          >
            {Array.from(HERO_SUBTEXT).map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-hero-sub-char
                className="inline-block whitespace-pre"
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          <div ref={ctasRef} className="mt-9 flex flex-wrap items-center gap-2.5 lg:flex-nowrap">
            <a
              href="mailto:siva_nagendra@outlook.com"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-accent px-4 text-sm leading-none font-semibold text-slate-950 transition-[filter] duration-200 hover:brightness-105"
            >
              <MailIcon className="h-4 w-4" />
              Start a conversation
            </a>
            <a
              href="https://linkedin.com/in/sivanagendra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm leading-none font-medium text-fore transition-colors duration-200 hover:border-accent/40 hover:text-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/siva-nagendra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm leading-none font-medium text-subtle transition-colors duration-200 hover:border-accent/30 hover:text-fore"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.imdb.com/name/nm8873739/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm leading-none font-medium text-subtle transition-colors duration-200 hover:border-highlight/35 hover:text-highlight"
            >
              <ImdbIcon className="h-3.5 w-[1.6rem] shrink-0 translate-y-px" />
              <span className="leading-none">IMDb</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div
            ref={factsRef}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {FACTS.map((fact) => (
              <div
                key={fact.value}
                className="motion-card rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-semibold tracking-[-0.04em] text-fore">
                  {fact.value}
                </div>
                <p className="mt-1 text-sm leading-6 text-subtle">{fact.label}</p>
              </div>
            ))}
          </div>

          <div ref={tagsRef} className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtle">
            {TAGS.map((tag, index) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium tracking-[0.04em] text-subtle"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative mx-auto w-full max-w-[34rem] lg:ml-auto"
        >
          <div
            className="pointer-events-none absolute -inset-8 rounded-[2.5rem] blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 25% 20%, rgba(117, 213, 255, 0.32), transparent 34%), radial-gradient(circle at 76% 18%, rgba(246, 197, 110, 0.28), transparent 26%)",
            }}
            suppressHydrationWarning
          />

          <div
            ref={panelRef}
            className="hero-photo-panel hero-panel-chromatic relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(4,7,16,0.5)]"
            suppressHydrationWarning
          >
            <div ref={photoPlaneRef} className="hero-photo-plane relative aspect-[4/5]">
              {/* suppressHydrationWarning: browser extensions can inject style/filter attrs into hero images */}
              <Image
                src="/images/siva-waterfront-2026.jpg"
                alt="Siva standing on a waterfront at sunset in Vancouver"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="hero-photo-media object-cover object-[50%_36%] [filter:saturate(1.06)_brightness(1.02)]"
                onLoad={() => ScrollTrigger.refresh()}
                suppressHydrationWarning
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3, 7, 15, 0.02) 0%, rgba(3, 7, 15, 0.06) 38%, rgba(3, 7, 15, 0.55) 100%)",
                }}
                suppressHydrationWarning
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(117, 213, 255, 0) 0%, rgba(117, 213, 255, 0.12) 100%)",
                }}
                suppressHydrationWarning
              />
            </div>

            <div
              ref={detailRef}
              className="hero-panel-overlay-plane absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6"
            >
              <div ref={detailLayerRef} className="hero-detail-layer">
                <div className="hero-detail-glass w-full rounded-[1.35rem] border border-white/12 bg-slate-950/38 px-4 py-4 shadow-[0_16px_44px_rgba(0,0,0,0.24)] backdrop-blur-[3px] sm:px-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-highlight">
                  Building systems that make creative teams ship
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STUDIOS.map((studio, index) => (
                    <span
                      key={studio}
                      className={`hero-detail-chip rounded-full border border-white/12 bg-slate-950/34 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-100/86 ${index % 2 === 0 ? "hero-detail-chip-front" : ""}`}
                    >
                      {studio}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="hidden items-center gap-3 text-xs uppercase tracking-[0.24em] text-subtle lg:flex"
        >
          <span>Scroll to explore</span>
          <div className="h-px w-20 bg-gradient-to-r from-accent via-highlight to-transparent" />
        </div>
      </div>
    </section>
  );
}
