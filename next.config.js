/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;

// Default configuration of images
// images: {
//   domains: ["placeimg.com"],
// },
