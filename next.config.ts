import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // output: 'export', <-- Esto es para cuando se usa GitHub Pages, carnalito
  images: {
    unoptimized: true,
  },
  // basePath: '/punto-visual-web', <-- Esto es para cuando se usa GitHub Pages, carnalito
  // assetPrefix: '/punto-visual-web/', <-- Esto es para cuando se usa GitHub Pages, carnalito
};

export default nextConfig;
