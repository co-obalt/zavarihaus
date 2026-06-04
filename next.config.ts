/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

module.exports = nextConfig;
