"use client";

import type { ComponentType, SVGProps } from "react";
import {
  ArrowUpRightIcon,
  ArtStationIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/SiteIcons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const LINKS: Array<{
  label: string;
  value: string;
  href: string;
  hint: string;
  icon: IconComponent;
}> = [
  {
    label: "Email",
    value: "siva_nagendra@outlook.com",
    href: "mailto:siva_nagendra@outlook.com",
    hint: "Best for role discussions and project inquiries",
    icon: MailIcon,
  },
  {
    label: "GitHub",
    value: "github.com/siva-nagendra",
    href: "https://github.com/siva-nagendra",
    hint: "Open source work, research experiments, and tooling",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sivanagendra",
    href: "https://linkedin.com/in/sivanagendra",
    hint: "Career updates, studio background, and recommendations",
    icon: LinkedInIcon,
  },
  {
    label: "ArtStation",
    value: "artstation.com/sivanagendra2",
    href: "https://www.artstation.com/sivanagendra2",
    hint: "Lookdev, realtime, material, and environment work",
    icon: ArtStationIcon,
  },
];

const RESUME_URL = "/documents/siva-nagendra-savarapu-resume.pdf";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="max-w-xl">
            <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-fore sm:text-4xl">
              Let&apos;s build the next generation of creative infrastructure
            </h2>
            <p className="mt-5 text-base leading-8 text-subtle">
              I&apos;m open to senior and staff-level platform, AI, and pipeline engineering roles
              where production tooling, real-time 3D, and generative systems intersect.
            </p>

            <div className="mt-8 space-y-3 text-sm text-subtle">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Based in Vancouver, and open to hybrid and remote opportunities in Vancouver and Sydney.
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-highlight" />
                Especially interested in AI platform, real-time, and USD pipeline work.
              </div>
            </div>

            <a
              href="mailto:siva_nagendra@outlook.com"
              className="motion-pill mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950"
            >
              <MailIcon className="h-4 w-4" />
              Email Siva
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-pill mt-4 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-fore transition-colors duration-200 hover:border-accent/30 hover:text-accent"
            >
              <ArrowUpRightIcon className="h-4 w-4" />
              View Resume
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="motion-card group flex min-h-44 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/18 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="motion-float flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/15 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRightIcon className="h-4 w-4 text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fore" />
                  </div>

                  <div className="mt-7">
                    <div className="text-xs font-medium uppercase tracking-[0.24em] text-subtle">
                      {link.label}
                    </div>
                    <div className="mt-2 text-base font-semibold tracking-[-0.02em] text-fore">
                      {link.value}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-subtle">{link.hint}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 pt-8 text-xs font-medium uppercase tracking-[0.24em] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>Siva Nagendra Savarapu</span>
          <span>Vancouver, Canada</span>
          <span>OpenUSD · Unreal Engine · Generative AI</span>
        </div>
      </div>
    </section>
  );
}
