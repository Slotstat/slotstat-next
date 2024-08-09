const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

// const withNextIntl = require("next-intl/plugin")(
//   // This is the default (also the `src` folder is supported out of the box)
//   "./i18n.ts"
// );

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/en/aboutus',
        destination: '/en/about-us',
        permanent: true,
      },
      {
        source: '/ka/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      // {
      //   source: '/:path((?!en|ka).*)',
      //   destination: '/en',
      //   permanent: true,
      // },
      {
        source: '/en/:uuid([a-f0-9-]{36})$',
        destination: '/en',
        permanent: false,
      },
      // Add more redirects as needed
    ]
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stage.gamesstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// module.exports = withNextIntl({
//   nextConfig,
// });
module.exports = withNextIntl(nextConfig);

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({
//   // your Next.js configuration
// })
