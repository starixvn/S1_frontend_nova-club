/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
}

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const optimizedImages = require('next-optimized-images');
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  '@dripsy/gradient',
  'moti',
  '@motify/core',
  '@motify/components',
  'app',
])

module.exports = withPlugins(
  [
    withTM,
    [withExpo, { projectRoot: __dirname }],
    [withFonts, { projectRoot: __dirname }],
    [optimizedImages, {
      projectRoot: __dirname,
      handleImages: ['png', 'svg'],
      images: {
            disableStaticImages: true
        }
    }]
  ],
  nextConfig
)
