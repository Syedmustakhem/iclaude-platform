import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Static export for Cloudflare Workers Static Assets
  output: "export",

  // Export /tools as /tools/index.html so Cloudflare
  // can serve the clean /tools/ URL correctly.
  trailingSlash: true,

  turbopack: {
    root: path.resolve(__dirname, ".."),
  },

  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;