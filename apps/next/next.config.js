const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  swcMinify: true,
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
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
}
const { withSentryConfig } = require('@sentry/nextjs')
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
  '@gorhom/portal',
  '@react-native-community/datetimepicker',
  'react-native-share',
  '@shopify/flash-list',
  'recyclerlistview',
])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  configFile: 'sentry.properties',
  // release:'cRQY4ipPhDjD8JQBiA-Lh'
  // release:'MxjIyysdrVpMqHPzIDoRe',
  release: 'c1T2jvE3-EqGkWZHDp0Rt',

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

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
    (nextConfig) => withSentryConfig(nextConfig, sentryWebpackPluginOptions),
    [withBundleAnalyzer],
  ],
  nextConfig
)

module.exports = moduleExports
