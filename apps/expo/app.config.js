// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "name": "Vui 123",
  "slug": "chlgame",
  "owner": "beacora",
  "version": "1.0.0",
  "sdkVersion": "44.0.0",
  "scheme": "chlgame",
  "platforms": [
    "ios",
    "android"
  ],
  "userInterfaceStyle": "dark",
  "ios": {
    "requireFullScreen": true,
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "bundleIdentifier": "com.chlgame.app",
    "infoPlist": {
      "NSCameraUsageDescription": "QR Scanning capability",
      "LSApplicationQueriesSchemes": ["fb", "instagram", "twitter", "vnd.youtube", "line", "whatsapp", "skype", "tg",]
    }
  },
  "android": {
    "icon": "../../packages/app/assets/nclub-appicon.png",
    "package": "com.chlgame.app",
    "permissions": ["CAMERA"]
  },
  "updates": {
    "checkAutomatically": "ON_ERROR_RECOVERY"
  }
}
