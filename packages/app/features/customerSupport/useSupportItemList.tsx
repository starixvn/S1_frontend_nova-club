import { SocialMedia, isURLSupported } from 'app/constants/socialMedia'
import { useEffect, useState } from 'react'
import { MEDIA_DOMAIN, CONTENT_URI } from '../../../../apps/next/config/env'
import { ImageSourcePropType } from 'react-native'

const Zalo = `${MEDIA_DOMAIN}${CONTENT_URI}/qr/zalo.jpg` as string
const Telegram = `${MEDIA_DOMAIN}${CONTENT_URI}/qr/telegram.jpg` as string

export const CONTACT_LIST = [
  {
    label: SocialMedia.TELEGRAM,
    icon: 'telegram',
    qr: Telegram,
  },
  {
    label: SocialMedia.ZALO,
    icon: 'zalo',
    qr: Zalo,
  },
  {
    label: SocialMedia.LIVECHAT,
    icon: 'iconCS',
  },
]

type ContactListType = typeof CONTACT_LIST

const useSupportItemList = () => {
  const [socialMediaList, setSocialMediaList] = useState<
    (ContactListType[number] & { href: string })[]
  >([])

  useEffect(() => {
    const getLists = async () => {
      const lists = CONTACT_LIST.map(async (platform) => {
        const href = await isURLSupported(platform.label)

        return {
          ...platform,
          href,
        }
      })

      const result = await Promise.all(lists)

      setSocialMediaList(result)
    }

    getLists()
  }, [])

  return socialMediaList
}

export default useSupportItemList
