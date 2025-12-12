/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,   // optional, you can remove this too
  },
};

module.exports = nextConfig;
