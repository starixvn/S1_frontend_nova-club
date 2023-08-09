import LoginScreen from 'app/features/auth/login/LoginScreen'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import 'desktop-ext/features/auth/login/LoginScreenDesktop'
import LoginScreenDesktop from 'desktop-ext/features/auth/login/LoginScreenDesktop'
import { useRouter } from 'next/router'
import useLoginWithToken from './hooks/useLoginWithToken'
// import AgentGuard from './agent/AgentGuard'

const guestRoutes = [
  '/account/leaderboard',
  '/games/keno-lottery',
  '/games/fishing',
  '/games/card',
  '/games/local',
  '/slots',
  '/livecasino',
  '/livecasino/sexy',
  '/sportsbook',
  '/download',
  '/info',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/games',
  '/lucky-spin-tnc',
  '/agent',
  '/event',
]

/* 
    Yet to verify whether manually clearning auth.info will auto redirect to login page or not
    which cause double redirection if after logout, replace("/auth/login") is executed
*/

export function serialize(obj) {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

const AuthenticationProvider = ({ children }) => {
  const router = useRouter()
  const { asPath, query, replace: nextJsReplace, route } = router
  const desktop = useIsDesktop()
  const loginInfo = useAppSelector((s) => s.auth.info)

  const isLoggedInWithToken = useLoginWithToken(loginInfo?.token)
  if (isLoggedInWithToken) {
    nextJsReplace('/', '/')
    return children
  }

  // After login success, push will take sometimes to redirect to after login page
  // persisting the LoginPage with query.r detection will prevent empty page being shown

  // if route doesnt exists in guestRoutes
  if (!guestRoutes.some((r) => route === '/' || asPath.startsWith(r))) {
    if (!loginInfo) {
      if (!desktop) nextJsReplace('/auth/login', '/auth/login?r=' + asPath, {})
      else {
        nextJsReplace('/', '/')
      }
      if (!desktop) return <LoginScreen />
      else return <LoginScreenDesktop />
    }
  }

  if (query.r) return <LoginScreen />

  //   if (asPath.startsWith('/agent')) return <AgentGuard>{children}</AgentGuard>

  return children
}

export default AuthenticationProvider
