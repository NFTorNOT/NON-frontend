/** @type {import('next').NextConfig} */
const path = require("path");
const securityHeaders = require("./headers");

const nextConfig = {
  unoptimized: true,
  images: {
    domains: [
      "static.plgworks.com",
      "nftornot-assests.s3.amazonaws.com",
      "non-staging-assests.s3.amazonaws.com",
      "static.staging.nftornot.com",
      "non-staging-statc-files.s3.amazonaws.com",
      "non-staging-statc-files.s3.us-east-2.amazonaws.com",
      "non-prod-static-files.s3.amazonaws.com",
      "static.nftornot.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    path: process.env.W_CDN_IMAGE_RESIZER_URL,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    exportPathMap: [],
  },
};

module.exports = nextConfig;
