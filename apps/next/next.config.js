const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  images: {
    disableStaticImages: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  // webpack: (config) => {
  //   config.optimization.minimize = false
  //   return config
  // },
}

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withVideos = require('next-videos')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/gradient',
  '@dripsy/core',
  'moti',
  '@motify/core',
  '@motify/components',
  'app',
  'utils',
  'services',
  'agent',
  '@gorhom/portal',
  '@react-native-community/datetimepicker',
  'react-native-share',
  '@shopify/flash-list',
  'recyclerlistview',
  'i18n-js',
])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = withPlugins(
  [
    withTM,
    [
      withImages,
      {
        inlineImageLimit: 0,
      },
    ],
    [withVideos],
    [withExpo, { projectRoot: __dirname }],
    [withFonts, { projectRoot: __dirname }],
    [withBundleAnalyzer],
  ],
  nextConfig
)

module.exports = moduleExports
