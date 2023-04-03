import React from 'react'
import LoginPage from 'app/features/auth/login'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'
import useLoginWithToken from '../hooks/useLoginWithToken'

const guestRoutes = [
  '/auth',
  '/profile/commission-table',
  '/launcher',
  '/customer-support',
  '/download',
  '/event',
  '/slot',
  '/livecasino',
  '/sportsbook',
  '/games',
  '/messages',
  '/agent',
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
  const { asPath, query, replace: nextJsReplace } = router

  const loginInfo = useAppSelector((s) => s.auth.info)

  const isLoggedInWithToken = useLoginWithToken(loginInfo?.token)
  if (isLoggedInWithToken) {
    nextJsReplace('/', '/')
    return children
  }

  // After login success, push will take sometimes to redirect to after login page
  // persisting the LoginPage with query.r detection will prevent empty page being shown

  // if route doesnt exists in guestRoutes
  if (!guestRoutes.some((r) => asPath === '/' || asPath.startsWith(r))) {
    if (!loginInfo) {
      nextJsReplace('/auth/login', '/auth/login?r=' + asPath, {})

      return <LoginPage />
    }
  }

  if (query.r) return <LoginPage />

  return children
}

export default AuthenticationProvider
