import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@consulting/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
