const IS_STAGING = process.env.APP_VARIANT === "staging";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "name": IS_STAGING ? "Nova Club Staging" : "Nova Club",
  "slug": "chlgame",
  "owner": "beacora",
  "version": "1.0.0",
  "sdkVersion": "44.0.0",
  "scheme": "chlgame",
  "splash": {
    "image": "../../packages/app/assets/devicon.png",
  },
  "platforms": [
    "ios",
    "android"
  ],
  "ios": {
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "bundleIdentifier": IS_STAGING ? "com.chlgame.staging" : "com.chlgame.app",
    "infoPlist": {
      "NSCameraUsageDescription": "QR Scanning capability",
      "LSApplicationQueriesSchemes": ["fb", "instagram", "twitter", "vnd.youtube", "line", "whatsapp", "skype", "tg",]
    }
  },
  "android": {
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "package": IS_STAGING ? "com.chlgame.staging" : "com.chlgame.app",
    "permissions": ["CAMERA"]
  },
  "updates": {
    "checkAutomatically": "ON_ERROR_RECOVERY"
  }
  // "plugins": ["expo-community-flipper"]
}
