"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARTWORKS = [
  {
    title: "DEATH WISH",
    description: "Full 3D scene: modelling in Maya, SpeedTree foliage, Xgen groom, Arnold atmosphere and volume lighting, Nuke comp.",
    likes: 50,
    permalink: "https://www.artstation.com/artwork/RY84vW",
    cover: "https://cdnb.artstation.com/p/assets/images/images/025/879/663/20200418090139/small_square/siva-nagendra-finaloutlow-01.jpg?1587218500",
    tags: ["Maya", "Arnold", "Nuke"],
    hasVideo: false,
  },
  {
    title: "Isolated Street | Unity HDRP",
    description: "Realtime cyberpunk scene in Unity HDRP with night shot lighting, rain particles, and wet surface materials.",
    likes: 53,
    permalink: "https://www.artstation.com/artwork/OynG88",
    cover: "https://cdnb.artstation.com/p/assets/images/images/025/377/801/small_square/siva-nagendra-vlcsnap-2020-03-31-02h32m31s692.jpg?1585603102",
    tags: ["Unity", "HDRP", "Real-Time"],
    hasVideo: true,
  },
  {
    title: "Old Temple Wall | Substance",
    description: "Procedural temple wall material in Substance Designer with stone weathering, moss, and displacement height maps.",
    likes: 9,
    permalink: "https://www.artstation.com/artwork/1ng4BX",
    cover: "https://cdna.artstation.com/p/assets/images/images/021/232/228/small_square/siva-nagendra-screenshot004.jpg?1570884559",
    tags: ["Substance Designer", "Marmoset"],
    hasVideo: false,
  },
];

export default function Artwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        y: 36, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="artwork" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <p className="section-kicker text-xs tracking-widest uppercase mb-4 text-accent">Art &amp; Renders</p>
            <h2 className="text-3xl sm:text-4xl font-bold">3D &amp; Lookdev Work</h2>
          </div>
          <a
            href="https://www.artstation.com/sivanagendra2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-fore transition-colors duration-200 shrink-0"
          >
            View full portfolio on ArtStation
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {ARTWORKS.map((art) => (
            <a
              key={art.permalink}
              href={art.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-card group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02]"
            >
              {/* Actual artwork image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* suppressHydrationWarning: Dark Reader injects inline filter styles on img elements */}
              <img
                src={art.cover}
                alt={art.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                loading="lazy"
                suppressHydrationWarning
              />

              {/* Gradient overlay always present at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Likes badge */}
              <div className="motion-pill motion-float absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm">
                <span aria-hidden>♥</span>
                {art.likes}
                {art.hasVideo && <span className="ml-1 text-[10px] text-accent" aria-label="has video">▶</span>}
              </div>

              {/* Bottom info, always visible but fuller on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-lg font-semibold text-white leading-tight mb-2 line-clamp-2">
                  {art.title}
                </p>
                <p className="text-sm leading-6 text-white/72 line-clamp-3">
                  {art.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {art.tags.map((t) => (
                    <span
                      key={t}
                      className="motion-pill rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
