import { store } from 'app/provider/redux/store'
import { configureAxios } from 'services/common/axiosInstance'
import { logOut } from 'app/utils/authUtil'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'

const useOnAppStart = () => {
  const { replace } = useRouter()

  useEffect(() => {
    configureAxios({
      store,
      onTokenExpired: async () => {
        await logOut()
        replace('/auth/login')
      },
      onUnauthorizedAccess: () => {
        replace('/auth/login')
      },
    })
  }, [])
}

export default useOnAppStart
