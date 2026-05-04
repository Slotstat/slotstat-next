const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

// const withNextIntl = require("next-intl/plugin")(
//   // This is the default (also the `src` folder is supported out of the box)
//   "./i18n.ts"
// );

const nextConfig = {
  trailingSlash: false,
  async rewrites() {
    return [
      // SignalR hub is at /events (not /api/events) on the backend
      {
        source: "/api/events/:path*",
        destination: "https://api.slotstat.net/events/:path*",
      },
      // Proxy all other backend API calls — must come after the SignalR rule
      // Next.js own API routes (/api/chat/*, /api/blogPost) take precedence and are NOT proxied
      {
        source: "/api/:path*",
        destination: "https://api.slotstat.net/api/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Old /en/aboutus URL
      {
        source: "/en/aboutus",
        destination: "/en/about-us",
        permanent: true,
      },
      // Georgian locale — redirect to English equivalents
      {
        source: "/ka/:path*",
        destination: "/en/:path*",
        permanent: true,
      },
      // www → non-www (Cloudflare handles HTTPS upgrade; this handles www path)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.slotstat.net" }],
        destination: "https://slotstat.net/:path*",
        permanent: true,
      },
      // Non-locale static pages → /en/ equivalents
      {
        source: "/:slug(faq|about-us|terms-of-use|privacy-policy|responsible-gaming|how-it-works|top-slots|providers|casinos)",
        destination: "/en/:slug",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/en/blog/:path*",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 86400,
    formats: ["image/avif", "image/webp"],
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
