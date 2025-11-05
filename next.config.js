/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    // Allow rendering of client components during build
    esmExternals: true,
  },
}

module.exports = nextConfig
