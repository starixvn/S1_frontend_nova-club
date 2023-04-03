import { useLazyUserInfoQuery } from 'agent/services/userApi'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter.web'
import { Platform } from 'react-native'

const useAfterLogin = () => {
  const [getUserInfo] = useLazyUserInfoQuery()
  // const [getAgentProfile] = useLazyAgentProfileQuery()
  // const [getShareholderProfile] = useLazyShareholderProfileQuery()

  const { replace, push } = useContextualRouter()
  // const navigation = useNavigation()

  async function handleAgentLogin() {
    try {
      const resp = await getUserInfo().unwrap()

      if (resp.has_logged_in === 0) {
        // navigation.dispatch(StackActions.push('AgentChangePassword')) //TODO change new route

        replace('/agent')
      } else {
        // if (Platform.OS === 'web') {
        //   let replaceRoute = afterLoginRedirection
        //   const urlParams = new URLSearchParams(window.location.search)
        //   const redirect = urlParams.get('r')
        //   if (redirect) replaceRoute = redirect
        //   replace(replaceRoute)
        // } else {
        //   push('/agent')
        // }
        // console.log(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // async function getProfileBasedOnRole(userRole: UserInfo['role']) {
  //   try {
  //     if (userRole === 'shareholder') {
  //       const {
  //         result: shareholderResult,
  //         success,
  //         message,
  //       } = await getShareholderProfile().unwrap()

  //       if (success && shareholderResult?.data.has_logged_in === 0) return true
  //     }
  //     if (userRole === ROLE.AGENT) {
  //       const {
  //         result: agentResult,
  //         success,
  //         message,
  //       } = await getAgentProfile().unwrap()

  //       if (success && agentResult?.data.has_logged_in === 0) return true
  //     }
  //     return false
  //   } catch (e) {
  //     console.log(e)
  //     return false
  //   }
  // }

  return {
    handleAgentLogin,
  }
}

export default useAfterLogin
