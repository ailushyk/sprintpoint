/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@easypoker/ui', '@easypoker/utils', '@easypoker/shared'],
  experimental: {
    serverActions: true,
    typedRoutes: false,
  },
  ignoreDuringBuilds: true,
}

module.exports = nextConfig
