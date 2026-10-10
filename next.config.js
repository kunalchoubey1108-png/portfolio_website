/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    // Pin the Turbopack root to this project so it doesn't walk up to a
    // lockfile in a parent directory (e.g. a home-dir package-lock.json).
    root: __dirname,
  },
};

module.exports = nextConfig;
