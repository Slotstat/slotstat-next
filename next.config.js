/** @type {import('next').NextConfig} */

// const withNextIntl = require("next-intl/plugin")(
//   // This is the default (also the `src` folder is supported out of the box)
//   "./i18n.ts"
// );

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

// module.exports = withNextIntl({
//   nextConfig,
// });
module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({
//   // your Next.js configuration
// })
