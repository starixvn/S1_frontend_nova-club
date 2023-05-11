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
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   },
  // },
  transpilePackages: [
    'react-native',
    'react-native-web',
    /* https://github.com/expo/expo/issues/21623 */
    '@react-native/assets',
    'expo-asset',
    'expo-font',
    'expo-modules-core',
    /* */
    'expo-image-picker',
    'solito',
    'dripsy',
    'moti',
    'app',
    'utils',
    'react-native-reanimated',
    '@expo/html-elements',
    '@expo/vector-icons',
    'react-native-gesture-handler',
  ],
}

const moduleExports = withExpo(withFonts(nextConfig))

module.exports = moduleExports
