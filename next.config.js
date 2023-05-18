/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "picsum.photos",
      "s3.eu-central-1.amazonaws.com",
      "stage.gamesstatic.com",
    ],
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({
//   // your Next.js configuration
// })
