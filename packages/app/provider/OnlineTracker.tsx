import usePathname from 'app/hooks/usePathname'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useEffect } from 'react'
import { playerApi } from 'services/playerApi'

const OnlineTracking = () => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const loginInfo = useAppSelector((s) => s.auth.info)

  useEffect(() => {
    if (loginInfo?.token) {
      dispatch(playerApi.endpoints.onlineCheck.initiate())
    }
  }, [pathname])

  return null
}

export default OnlineTracking
