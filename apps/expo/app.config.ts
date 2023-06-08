import { ExpoConfig, ConfigContext } from 'expo/config'

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Vui 123',
  slug: 'vui123',
  version: '2.0.0',
  scheme: 'vui123',
  platforms: ['ios', 'android'],
  updates: {
    enabled: false,
  },
  jsEngine: 'jsc',
  ios: {
    requireFullScreen: true,
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.solitoexporouter',
  },
  androidNavigationBar: {
    visible: 'immersive',
    barStyle: 'light-content',
    backgroundColor: '#00000000',
  },
  android: {
    package: 'com.anonymous.solitoexporouter',
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
    [
      'expo-screen-orientation',
      {
        initialOrientation: 'DEFAULT',
      },
    ],
  ],
})

export default expoConfig
