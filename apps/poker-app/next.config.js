/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@easypoker/ui', '@easypoker/utils'],
  experimental: {
    serverActions: true,
    typedRoutes: false,
  },
  ignoreDuringBuilds: true,
}

module.exports = nextConfig
