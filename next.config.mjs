/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Removed unoptimized: true to allow for image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ], // Add domains for your blog images
    formats: ['image/webp', 'image/avif'], // Support modern formats
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/*"],
  },
  // Add turbopack root configuration to address workspace warning
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
