const IS_STAGING = process.env.APP_VARIANT === "staging";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "name": "Nova Club Staging",
  "slug": "chlgame",
  "owner": "beacora",
  "version": "1.0.0",
  "sdkVersion": "44.0.0",
  "scheme": "chlgame",
  "splash": {
    "image": "../../packages/app/assets/nclub-appicon.png",
  },
  "platforms": [
    "ios",
    "android"
  ],
  "userInterfaceStyle": "dark",
  "ios": {
    "requireFullScreen": true,
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "bundleIdentifier": "com.chlgame.staging",
    "infoPlist": {
      "NSCameraUsageDescription": "QR Scanning capability",
      "LSApplicationQueriesSchemes": ["fb", "instagram", "twitter", "vnd.youtube", "line", "whatsapp", "skype", "tg",]
    }
  },
  "android": {
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "package": "com.chlgame.staging",
    "permissions": ["CAMERA"]
  },
  "updates": {
    "checkAutomatically": "ON_ERROR_RECOVERY"
  }
  // "plugins": ["expo-community-flipper"]
}
