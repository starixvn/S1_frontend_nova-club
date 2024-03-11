import { SocialMedia, isURLSupported } from 'app/constants/socialMedia'
import { useEffect, useState } from 'react'

export const CONTACT_LIST = [
  {
    label: SocialMedia.TELEGRAM_MEDIA,
    icon: 'telegram',
  },
  {
    label: SocialMedia.FACEBOOK,
    icon: 'facebook',
  },
  {
    label: SocialMedia.YOUTUBE,
    icon: 'youtube',
  },
]

type ContactListType = typeof CONTACT_LIST

const useMediaList = () => {
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

export default useMediaList
