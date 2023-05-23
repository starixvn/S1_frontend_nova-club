module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      // https://expo.github.io/router/docs/#configure-the-babel-plugin
      require.resolve('expo-router/babel'),
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          envName: 'APP_ENV',
          allowUndefined: true,
          path: '../../env/.env',
        },
      ],
    ],
  }
}
