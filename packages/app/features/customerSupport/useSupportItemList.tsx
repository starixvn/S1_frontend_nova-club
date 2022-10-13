import useLocalization from 'app/provider/localization'
import { isURLSupported, SocialMedia } from 'app/utils/helper'
import { useEffect, useState } from 'react'

export const CONTACT_LIST = [
  {
    label: SocialMedia.TELEGRAM,
    icon: 'tg',
    bg: ['#C0E0FD', '#33A0D0'],
  },
  {
    label: SocialMedia.ZALO,
    image: require('../../assets/images/social-media/zalo.jpg'),
    bg: ['#51aafd', '#3a62f6'],
  },
  {
    label: SocialMedia.LIVECHAT,
    icon: 'cs',
    bg: ['#FC819B', '#E13256'],
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
