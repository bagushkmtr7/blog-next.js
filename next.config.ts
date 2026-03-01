import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Abaikan error TS pas build
  },
  eslint: {
    ignoreDuringBuilds: true, // Abaikan error ESLint pas build
  },
};

export default nextConfig;
