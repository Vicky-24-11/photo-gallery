/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Required for Capacitor static deployment
  images: {
    unoptimized: true, // For static export
    domains: ['images.unsplash.com'], // Add this line to allow Unsplash images
  },
  // Ensure the app works without JavaScript (for better SEO)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;