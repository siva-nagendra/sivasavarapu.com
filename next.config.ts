import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sivasavarapu.com",
          },
        ],
        destination: "https://sivasavarapu.com/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
