import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Static export for Cloudflare Static Assets.
  output: "export",

  // Generate /tools/index.html etc.
  trailingSlash: true,

  // Static export cannot use Next.js server-side
  // Image Optimization API.
  images: {
    unoptimized: true,
  },

  turbopack: {
    root: path.resolve(__dirname, ".."),
  },

  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;