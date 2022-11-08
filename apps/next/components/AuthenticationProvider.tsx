import LoginPage from 'app/features/auth/login'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'
import useLoginWithToken from '../hooks/useLoginWithToken'
import React from 'react'

const guestRoutes = [
  '/auth',
  '/profile/commission-table',
  '/launcher',
  '/customer-support',
  '/download',
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
  const { push, route, asPath, query } = useRouter()
  const loginInfo = useAppSelector((s) => s.auth.info)

  const isLoggedInWithToken = useLoginWithToken(!!loginInfo)
  if (isLoggedInWithToken) {
    push('/', '/', { shallow: true })
    return children
  }

  // After login success, push will take sometimes to redirect to after login page
  // persisting the LoginPage with query.r detection will prevent empty pages being shown

  // if route doesnt exists in guestRoutes
  if (!guestRoutes.some((r) => asPath.startsWith(r))) {
    if (!loginInfo) {
      let serializedQuery = serialize(query)

      push(
        `${route}?r=${route}&${serializedQuery}`,
        `/auth/login?r=${route}&${serializedQuery}`,
        {
          shallow: true,
        }
      )

      return <LoginPage />
    }
  }

  if (query.r) return <LoginPage />

  return children
}

export default AuthenticationProvider
