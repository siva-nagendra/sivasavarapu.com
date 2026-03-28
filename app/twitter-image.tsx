import { ImageResponse } from "next/og";
import { renderSocialImage, SOCIAL_IMAGE_SIZE } from "./social-image";

export const alt = "Siva Nagendra Savarapu portfolio preview";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(await renderSocialImage(), {
    ...size,
  });
}
