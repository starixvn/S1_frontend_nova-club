import { SocialMedia, isURLSupported } from 'app/constants/socialMedia'
import useLocalization from 'app/provider/localization'
import { useEffect, useState } from 'react'

export const CONTACT_LIST = [
  {
    label: SocialMedia.TELEGRAM,
    icon: 'telegram',
  },
  {
    label: SocialMedia.ZALO,
    icon: 'telegram',
  },
  {
    label: SocialMedia.LIVECHAT,
    icon: 'cs',
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
