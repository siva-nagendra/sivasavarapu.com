import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0c1624 0%, #060a12 100%)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            borderRadius: 46,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(145deg, #0c1624 0%, #060a12 100%)",
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.28)",
          }}
        >
          <svg
            width="116"
            height="116"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="stroke" x1="16" y1="14" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#7de3ff" />
                <stop offset="1" stopColor="#58bfff" />
              </linearGradient>
            </defs>
            <path
              d="M42.5 18.5h-14c-5.247 0-9.5 4.253-9.5 9.5 0 3.113 1.5 5.877 3.818 7.61l8.85 6.616c1.213.907 1.329 2.693.237 3.748-.493.476-1.151.741-1.837.741H19.5"
              fill="none"
              stroke="url(#stroke)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="46" cy="18" r="3.5" fill="#f6c56e" />
          </svg>
        </div>
      </div>
    ),
    size
  );
}
