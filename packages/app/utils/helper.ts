import { Linking, Platform } from 'react-native'

export async function openSocialPlatform(platform: string) {
  let scheme: string = ''
  let backUpScheme: string = ''

  switch (platform) {
    case 'facebook':
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
    case 'instagram':
      backUpScheme = 'https://www.instagram.com/nova88_official'
      scheme = `instagram://user?username=nova88_official`
      break
    case 'twitter':
      backUpScheme = 'https://twitter.com/nova88official?s=11'
      scheme = `https://twitter.com/nova88official?s=11`
      break
    case 'youtube':
      backUpScheme = 'https://www.youtube.com/channel/UCoUtgrQN2E10oke1Hmj0ATw'
      scheme = 'vnd.youtube://channel/UCoUtgrQN2E10oke1Hmj0ATw'
      break
    case 'telegram':
      backUpScheme = 'https://t.me/Nova88Support1'
      scheme = 'https://t.me/Nova88Support1'
      break
    case 'livechat':
      scheme = 'https://direct.lc.chat/11638088/'
      break
    case 'envelope':
      scheme = 'mailto:support@nova88.com'
      break
  }

  const supported = await Linking.canOpenURL(scheme)
  if (supported) Linking.openURL(scheme)
  else Linking.openURL(backUpScheme)
}
