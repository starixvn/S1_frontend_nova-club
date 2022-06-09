import { configureAxios } from 'app/services/common/axiosInstance'
import { logOut } from 'app/utils/authUtil'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'

const useOnAppStart = () => {
  const { replace } = useRouter()

  useEffect(() => {
    configureAxios({
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
