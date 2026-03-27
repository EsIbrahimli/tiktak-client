import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.sarkhanrahimli.dev",
      },
    ],
  },
};

export default nextConfig;
