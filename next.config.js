/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/portfolio_website",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
