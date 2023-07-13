import { ExpoConfig, ConfigContext } from 'expo/config'

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Vui 123',
  slug: 'vui123',
  version: '2.0.0',
  scheme: 'vuifit',
  platforms: ['ios', 'android'],
  orientation: 'portrait',
  backgroundColor: '#1E2238',
  primaryColor: '#7B7BCF',
  notification: {
    iosDisplayInForeground: true,
    androidMode: 'default',
  },
  updates: {
    enabled: false,
  },
  jsEngine: 'jsc',
  icon: 'https://static-stage.gball8.com/nvclub/nova-club/content/app-logo-1024.png',
  ios: {
    requireFullScreen: true,
    supportsTablet: true,
    bundleIdentifier: 'com.vuifit.app',
    // infoPlist: {
    //   // to add
    //   // - LSApplicationQueriesSchemes
    // },
    associatedDomains: [
      'applinks:s2syf.app.link',
      'applinks:s2syf.test.app.link',
      'applinks:s2syf-alternate.app.link',
      'applinks:s2syf-alternate.test.app.link',
    ],
  },
  androidStatusBar: {
    barStyle: 'light-content',
  },
  androidNavigationBar: {
    visible: 'immersive',
    barStyle: 'light-content',
    backgroundColor: '#00000000',
  },
  android: {
    package: 'com.chlgame.app',
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
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
      },
    ],
  ],
})

export default expoConfig
