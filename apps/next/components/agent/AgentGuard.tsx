import React, { useEffect } from 'react'
import LoginPage from 'app/features/auth/login'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'

const AgentGuard = ({ children }) => {
  const router = useRouter()
  const { asPath, query, replace: nextJsReplace } = router

  const isLoggedIn = useAppSelector((s) => !!s.agent.access_token)
  const { has_logged_in, has_otp } = useAppSelector((s) => s.agent)

  const isFirstTimeLogin = !has_logged_in || !has_otp

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
