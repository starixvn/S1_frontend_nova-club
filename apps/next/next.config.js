const path = require('path')

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withVideos = require('next-videos')
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
  ],
}

const moduleExports = withPlugins(
  [
    [
      withImages,
      {
        inlineImageLimit: 0,
      },
    ],
    [withVideos],
    [withExpo, { projectRoot: __dirname }],
    [withFonts, { projectRoot: __dirname }],
  ],
  nextConfig
)

module.exports = moduleExports
