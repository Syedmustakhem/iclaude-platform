import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  output: "export",

  turbopack: {
    root: path.resolve(__dirname, ".."),
  },

  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;