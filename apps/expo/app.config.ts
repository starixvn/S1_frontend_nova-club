import { ExpoConfig, ConfigContext } from 'expo/config'

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Vui 123',
  slug: 'vui123',
  version: '2.0.0',
  scheme: 'vui123',
  platforms: ['ios', 'android'],
  ios: {
    bundleIdentifier: 'com.chlgame.staging2',
  },
  android: {
    package: 'com.chlgame.staging2',
  },
  plugins: [
    [
      'expo-av',
      {
        microphonePermission:
          'Allow $(PRODUCT_NAME) to access your microphone.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'custom photos permission',
        cameraPermission: 'Allow $(PRODUCT_NAME) to open the camera',

        '//': 'Disables the microphone permission',
        microphonePermission: false,
      },
    ],
    [
      './app.plugin',
      {
        android: {
          CodePushDeploymentKey: 'YOUR_ANDROID_CODE_PUSH_KEY',
        },
        ios: {
          CodePushDeploymentKey: 'YOUR_IOS_CODE_PUSH_KEY',
        },
      },
    ],
  ],
})

export default expoConfig
