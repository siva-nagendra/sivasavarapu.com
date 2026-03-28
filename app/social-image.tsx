import { readFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

const HERO_IMAGE_PATH = join(process.cwd(), "public", "images", "siva-waterfront-2026.jpg");

async function getHeroImageDataUrl() {
  const buffer = await readFile(HERO_IMAGE_PATH);
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function renderSocialImage() {
  const heroImage = await getHeroImageDataUrl();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 22%, rgba(117, 213, 255, 0.18), transparent 30%), radial-gradient(circle at 82% 16%, rgba(246, 197, 110, 0.18), transparent 24%), linear-gradient(180deg, #04060b 0%, #050913 52%, #04060b 100%)",
        color: "#f2f6ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 56,
          top: 56,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 56,
            height: 2,
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(117,213,255,1), rgba(117,213,255,0.2))",
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#75d5ff",
            fontWeight: 700,
          }}
        >
          AI x 3D Pipelines
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "62%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "110px 56px 64px",
        }}
      >
        <div
          style={{
            fontSize: 88,
            lineHeight: 0.92,
            letterSpacing: "-0.06em",
            fontWeight: 700,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Siva</span>
          <span>Nagendra</span>
          <span style={{ color: "#75d5ff" }}>Savarapu</span>
        </div>

        <div
          style={{
            marginTop: 26,
            maxWidth: 560,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#b7c5de",
            display: "flex",
          }}
        >
          Senior Pipeline Engineer and Generative AI specialist building production-grade
          OpenUSD, Unreal Engine, and agentic 3D systems.
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {["OpenUSD", "Unreal Engine", "PyTorch", "TensorFlow", "Agentic AI"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "#d7e4f7",
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#75d5ff",
                }}
              />
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "38%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 56px 56px 0",
        }}
      >
        <div
          style={{
            width: 360,
            height: 470,
            borderRadius: 36,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 28px 80px rgba(4, 7, 16, 0.56)",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            position: "relative",
          }}
        >
          <img
            src={heroImage}
            alt="Siva standing on a waterfront at sunset"
            width={360}
            height={470}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 34%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(3,7,15,0.02) 0%, rgba(3,7,15,0.08) 44%, rgba(3,7,15,0.58) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 18,
              right: 18,
              bottom: 18,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(7, 12, 22, 0.5)",
              padding: "18px 18px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#f6c56e",
                fontWeight: 700,
              }}
            >
              Building systems that make creative teams ship
            </div>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {["Epic Games", "Sony Pictures", "Animal Logic", "MPC Film"].map((studio) => (
                <div
                  key={studio}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f3f7ff",
                    padding: "8px 12px",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {studio}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
