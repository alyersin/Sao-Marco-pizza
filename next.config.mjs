/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures best practices in React
  experimental: {
    appDir: true, // Enables the /app directory for routing
  },
  images: {
    domains: ["example.com"], // Add domains for external images if needed
  },
};

export default nextConfig;
