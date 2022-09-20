module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: ['react-native-reanimated/plugin', [
      "module:react-native-dotenv",
      {
        "envName": "APP_ENV",
        "allowUndefined": true,
        "path": "../../.env"
      }
    ]],
  }
}
