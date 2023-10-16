import { LIVECHAT_URL } from '@env'
import { Linking, Platform } from 'react-native'

export enum SocialMedia {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
  TELEGRAM_MEDIA = 'telegram-media',
  LIVECHAT = 'liveChat',
  ENVELOPE = 'envelope',
  ZALO = 'zalo',
  TIKTOK = 'tiktok',
}

export function getSocialMediaScheme(platform: SocialMedia) {
  let scheme: string = ''
  let backUpScheme: string = ''

  switch (platform) {
    case SocialMedia.FACEBOOK:
      backUpScheme = 'https://www.facebook.com/vui123vietnam'
      const s = Platform.select({
        ios: 'fb://profile',
        android: 'fb://page',
      })
      scheme = s || ''
      if (scheme) scheme = `${scheme}/100279542799962`
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
      backUpScheme = 'https://www.youtube.com/@vui123vn'
      // scheme = 'vnd.youtube://channel/UCoUtgrQN2E10oke1Hmj0ATw'
      break
    case SocialMedia.TELEGRAM:
      backUpScheme = 'https://t.me/vui123cs'
      scheme = 'https://t.me/vui123cs'
      break
    case SocialMedia.TELEGRAM_MEDIA:
      backUpScheme = 'https://t.me/cungvui123'
      scheme = 'https://t.me/cungvui123'
      break
    case SocialMedia.LIVECHAT:
      scheme = LIVECHAT_URL
      break
    case SocialMedia.ENVELOPE:
      scheme = 'mailto:support@nova88.com'
      break
    case SocialMedia.ZALO:
      scheme = 'https://zalo.me/84782801659'
      break
    case SocialMedia.TIKTOK:
      backUpScheme = 'https://www.tiktok.com/@vui123_vn'
      scheme = 'https://www.tiktok.com/@vui123_vn'
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
