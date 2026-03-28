import { readFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

const SOCIAL_PREVIEW_PATH = join(
  process.cwd(),
  "public",
  "images",
  "social-preview-reference.png"
);

async function getSocialPreviewDataUrl() {
  const buffer = await readFile(SOCIAL_PREVIEW_PATH);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export async function renderSocialImage() {
  const previewImage = await getSocialPreviewDataUrl();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#050913",
      }}
    >
      <img
        src={previewImage}
        alt="Siva Nagendra Savarapu portfolio preview"
        width={SOCIAL_IMAGE_SIZE.width}
        height={SOCIAL_IMAGE_SIZE.height}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />
    </div>
  );
}
