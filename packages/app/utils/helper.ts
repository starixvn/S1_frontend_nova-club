import { Linking, Platform } from 'react-native'

export enum SocialMedia {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
  LIVECHAT = 'livechat',
  ENVELOPE = 'envelope',
  ZALO = 'zalo',
}

export function getSocialMediaScheme(platform: SocialMedia) {
  let scheme: string = ''
  let backUpScheme: string = ''

  switch (platform) {
    case SocialMedia.FACEBOOK:
      backUpScheme = 'https://www.facebook.com/nova88official/'
      const s = Platform.select({
        ios: 'fb://profile',
        android: 'fb://page',
      })
      scheme = s || ''
      if (scheme) scheme = `${scheme}/100735694719310`
      break
    // case 'whatsapp':
    //   backUpScheme = 'https://api.whatsapp.com/send?'
    //   scheme = 'https://api.whatsapp.com/send?'
    case SocialMedia.INSTAGRAM:
      backUpScheme = 'https://www.instagram.com/nova88_official'
      scheme = `instagram://user?username=nova88_official`
      break
    case SocialMedia.TWITTER:
      backUpScheme = 'https://twitter.com/nova88official?s=11'
      scheme = `https://twitter.com/nova88official?s=11`
      break
    case SocialMedia.YOUTUBE:
      backUpScheme = 'https://www.youtube.com/channel/UCoUtgrQN2E10oke1Hmj0ATw'
      scheme = 'vnd.youtube://channel/UCoUtgrQN2E10oke1Hmj0ATw'
      break
    case SocialMedia.TELEGRAM:
      backUpScheme = 'https://t.me/vui123cs'
      scheme = 'https://t.me/vui123cs'
      break
    case SocialMedia.LIVECHAT:
      scheme =
        'https://secure.livechatinc.com/licence/14440122/v2/open_chat.cgi'
      break
    case SocialMedia.ENVELOPE:
      scheme = 'mailto:support@nova88.com'
      break
    case SocialMedia.ZALO:
      scheme = 'https://zalo.me/84782801659'
      break
  }

  return {
    scheme,
    backUpScheme,
  }
}

export async function isURLSupported(platform: SocialMedia) {
  const { backUpScheme, scheme } = getSocialMediaScheme(platform)

  const supported = await Linking.canOpenURL(scheme)

  return supported ? scheme : backUpScheme
}
