import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import { store } from 'app/provider/redux/store'
import { logOut } from 'app/utils/authUtil'
import { useCallback, useContext, useEffect } from 'react'
import { configureAxios } from 'services/common/axiosInstance'
import { useRouter } from 'solito/router'

const useOnAppStart = () => {
  const { replace } = useRouter()

  const { stacks, clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )

  const redirectToLoginPage = useCallback(() => {
    replace('/auth/login')

    if (stacks.length > 0) {
      clearNavigationStack()
    }
  }, [clearNavigationStack, replace, stacks.length])

  useEffect(() => {
    configureAxios({
      store,
      onTokenExpired: async () => {
        await logOut()
        redirectToLoginPage()
      },
      onUnauthorizedAccess: () => {
        redirectToLoginPage()
      },
    })
  }, [redirectToLoginPage])
}

export default useOnAppStart
