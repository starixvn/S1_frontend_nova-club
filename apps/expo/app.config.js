const IS_STAGING = process.env.APP_VARIANT === "staging";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "name": IS_STAGING ? "Nova Club Staging" : "Nova Club",
  "slug": "chlgame",
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
    "bundleIdentifier": IS_STAGING ? "com.chlgame.staging" : "com.chlgame"
  },
  "android": {
    "package": IS_STAGING ? "com.chlgame.staging" : "com.chlgame"
  }
}
