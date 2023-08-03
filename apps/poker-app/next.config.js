/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@easypoker/ui',
    '@easypoker/ui/src/lib',
    '@easypoker/utils',
  ],
  experimental: {
    serverActions: true,
    typedRoutes: false,
  },
  ignoreDuringBuilds: true,
}

module.exports = nextConfig
