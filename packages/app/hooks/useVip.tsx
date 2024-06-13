import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useMemo } from 'react'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerProfileQuery } from 'services/playerApi'

const useVip = () => {
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data } = usePlayerProfileQuery(undefined, { skip: !isLoggedIn })

  const avatar = useMemo(() => {
    switch (data?.vip_level) {
      case 2:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip1.png`
      case 3:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip2.png`
      case 4:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip3.png`
      case 5:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip4.png`
      case 6:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip5.png`
      case 7:
        return `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vvip.png`

      case 1:
      default:
        return require('app/assets/images/common/avatarx2.png')
    }
  }, [data])

  return { avatar }
}

export default useVip
