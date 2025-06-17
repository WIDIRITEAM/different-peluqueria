import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Deshabilitar ESLint durante la build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
