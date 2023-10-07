/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['utfs.io']
  }
};

module.exports = nextConfig;
