/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig