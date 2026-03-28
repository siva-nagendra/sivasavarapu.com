import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .75a11.25 11.25 0 0 0-3.556 21.93c.563.103.769-.244.769-.544 0-.269-.01-.982-.015-1.928-3.128.68-3.787-1.508-3.787-1.508-.512-1.3-1.25-1.647-1.25-1.647-1.022-.699.078-.685.078-.685 1.13.08 1.725 1.16 1.725 1.16 1.004 1.72 2.635 1.223 3.276.935.102-.727.393-1.223.715-1.504-2.497-.284-5.123-1.248-5.123-5.556 0-1.228.438-2.234 1.157-3.021-.116-.284-.501-1.426.11-2.972 0 0 .944-.302 3.093 1.154a10.745 10.745 0 0 1 5.632 0c2.147-1.456 3.089-1.154 3.089-1.154.613 1.546.228 2.688.112 2.972.721.787 1.155 1.793 1.155 3.021 0 4.319-2.631 5.268-5.136 5.546.404.348.764 1.033.764 2.082 0 1.503-.013 2.716-.013 3.086 0 .303.203.652.776.541A11.251 11.251 0 0 0 12 .75Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.374 3.25a2.126 2.126 0 1 1 0 4.252 2.126 2.126 0 0 1 0-4.252ZM3.75 8.75h3.248v11.5H3.75zm5.75 0h3.115v1.57h.045c.433-.821 1.494-1.686 3.076-1.686 3.29 0 3.896 2.165 3.896 4.982v6.634h-3.246v-5.88c0-1.402-.025-3.205-1.952-3.205-1.955 0-2.255 1.527-2.255 3.103v5.982H9.5z" />
    </svg>
  );
}

export function ArtStationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m14.84 3.75 5.41 9.374H9.43l5.41-9.374ZM8.27 15.124H20.8L18.93 18.25H6.4l1.87-3.126ZM3.75 18.25h4.453l-2.226-3.845L3.75 18.25Zm2.227-5.126 1.538-2.66 4.538 7.786H7.515l-1.538-2.66Z" />
    </svg>
  );
}

export function ImdbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.5 6.5h17a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm1.9 2.35v6.3h1.5v-6.3H5.4Zm2.53 0v6.3h1.56l.63-3.18.62 3.18h1.57v-6.3h-1.28v4.5l-.9-4.5H9.6l-.86 4.5v-4.5H7.93Zm5.98 0v6.3h1.96c1.45 0 2.17-.68 2.17-2.03v-2.23c0-1.36-.72-2.04-2.17-2.04h-1.96Zm1.5 1.2h.36c.49 0 .73.24.73.72v2.48c0 .48-.24.72-.73.72h-.36v-3.92Zm3.69-1.2v6.3h1.5v-6.3h-1.5Z" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2.75 1.902 5.098 5.098 1.902-5.098 1.902L12 16.75l-1.902-5.098-5.098-1.902 5.098-1.902L12 2.75Z" />
      <path d="m18.25 14.5.99 2.76 2.76.99-2.76.99-.99 2.76-.99-2.76-2.76-.99 2.76-.99.99-2.76Z" />
    </svg>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="m12 2.75 8 4.5v9l-8 4.5-8-4.5v-9l8-4.5Z" />
      <path d="M4 7.25 12 12l8-4.75" />
      <path d="M12 12v8.75" />
    </svg>
  );
}

export function NodesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="5" cy="6" r="2.25" />
      <circle cx="19" cy="6" r="2.25" />
      <circle cx="12" cy="18" r="2.25" />
      <path d="M7 7.3 10.2 15M17 7.3 13.8 15M7.1 6H16.9" />
    </svg>
  );
}

export function PipelineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="4" width="5" height="4.5" rx="1.2" />
      <rect x="15.5" y="4" width="5" height="4.5" rx="1.2" />
      <rect x="9.5" y="15.5" width="5" height="4.5" rx="1.2" />
      <path d="M8.5 6.25h7M12 8.5v7" />
    </svg>
  );
}

export function WaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M2.75 15c2.25 0 2.25-6 4.5-6s2.25 6 4.5 6 2.25-6 4.5-6 2.25 6 4.5 6" />
      <path d="M2.75 19h18.5" />
    </svg>
  );
}
