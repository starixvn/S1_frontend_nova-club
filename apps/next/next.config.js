const path = require('path')

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withVideos = require('next-videos')
const withImages = require('next-images')

const APP_ENV = process.env.APP_ENV || 'prod'
const result = require('dotenv').config({
  path: `../../env/.env`,
})

const env = {}
Object.keys(result.parsed).forEach((key) => {
  env[key] = process.env[key]
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  images: {
    disableStaticImages: true,
    domains: [
      'static.zzspeed.site',
      'static-global.static-bifrost.com', // delete this before going prod
    ],
  },
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
    'react-native-qrcode-svg',
    'react-native-gesture-handler',
    'react-native-modalfy',
    'react-native-reanimated',
    'react-native-reanimated-carousel',
    'react-native-web',
    'react-native-shadow-2',
    'react-native-svg',
    'react-native-toast-message',
    /* https://github.com/expo/expo/issues/21623 */
    '@react-native/assets',
    'expo-asset',
    'expo-font',
    'expo-modules-core',
    /* */
    'expo-clipboard',
    'expo-image-picker',
    'expo-linear-gradient',
    'expo-sharing',
    'solito',
    'dripsy',
    'moti',
    'i18n-js',
    'app',
    'utils',
    '@expo/html-elements',
    '@expo/vector-icons',
    'zeego',
    '@shopify/flash-list',
    'recyclerlistview',
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
    [withExpo, { projectRoot: __dirname }],
    [withFonts, { projectRoot: __dirname }],
  ],
  { ...nextConfig, env }
)

module.exports = moduleExports
