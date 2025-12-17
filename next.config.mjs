/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This enables static export for GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/*"],
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  basePath: "/aman_portfolio",
  trailingSlash: true,
};

export default nextConfig;
