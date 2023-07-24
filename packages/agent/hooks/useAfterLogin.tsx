import { useLazyUserInfoQuery } from 'agent/services/userApi'
import { useRouter } from 'solito/router'

const useAfterLogin = () => {
  const [getUserInfo] = useLazyUserInfoQuery()

  const { replace, push } = useRouter()

  async function handleAgentLogin() {
    try {
      const resp = await getUserInfo().unwrap()

      if (resp.has_logged_in === 0) {
        // navigation.dispatch(StackActions.push('AgentChangePassword')) //TODO change new route

        replace('/agent')
      } else {
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    handleAgentLogin,
  }
}

export default useAfterLogin
