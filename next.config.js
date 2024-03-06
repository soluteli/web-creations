/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack').default({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  }
}

module.exports = nextConfig
