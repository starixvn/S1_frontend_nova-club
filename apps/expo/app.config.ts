import { ExpoConfig, ConfigContext } from 'expo/config'

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'solito-expo-router',
  slug: 'solito-expo-router',
  version: '1.0.0',
  scheme: 'solito-expo-router',
  platforms: ['ios', 'android'],
  ios: {
    bundleIdentifier: 'com.solito.expo-router',
  },
  android: {
    package: 'com.anonymous.solitoexporouter',
  },
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission: 'custom photos permission',
        cameraPermission: 'Allow $(PRODUCT_NAME) to open the camera',

        '//': 'Disables the microphone permission',
        microphonePermission: false,
      },
    ],
  ],
})

export default expoConfig
