/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Allow build even if ESLint fails
  },
};

module.exports = nextConfig;