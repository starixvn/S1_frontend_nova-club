// const withPlugins = require('next-compose-plugins');
const APP_ENV = process.env.APP_ENV || 'prod'
const result = require('dotenv').config({
  path: `../../env/.env.${APP_ENV}`,
})

const env = {}
Object.keys(result.parsed).forEach((key) => {
  env[key] = process.env[key]
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: env.REWARDS_BASE_PATH,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-stage.gball8.com',
      },
      {
        protocol: 'https',
        hostname: 'static-stage.beviking.net',
      },
      {
        protocol: 'https',
        hostname: 'static.zzspeed.site',
      },
    ],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
  transpilePackages: [],
  env,
  headers: async () => [
    {
      // list more extensions here if needed; these are all the resources in the `public` folder including the subfolders
      source: '/:all*(woff2)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate', // 86400s = 1 day
        },
      ],
    },
  ],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]

    config.plugins.push(new webpack.DefinePlugin({ __DEV__: dev }))
    // Important: return the modified config
    return config
  },
}

nextConfig

module.exports = nextConfig
