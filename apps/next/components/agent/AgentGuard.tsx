import React, { useEffect } from 'react'
import LoginPage from 'app/features/auth/login'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'
import { HAS_LOG_IN_MAP } from 'agent/utils/authUtil'

const AgentGuard = ({ children }) => {
  const router = useRouter()
  const { asPath, query, replace: nextJsReplace } = router

  const isLoggedIn = useAppSelector((s) => !!s.agent.access_token)
  const hasLogIn = useAppSelector((s) => s.agent.has_logged_in)

  const isFirstTimeLogin = hasLogIn === HAS_LOG_IN_MAP.FIRST_TIME_LOGIN

  if (!isLoggedIn) {
    nextJsReplace('/auth/login?t=agent&r=' + asPath)

    return <LoginPage />
  }

  if (isFirstTimeLogin && asPath !== '/agent/reset-password') {
    nextJsReplace('/agent/reset-password')
  }

  if (query.r) return <LoginPage />

  return children
}

export default AgentGuard
