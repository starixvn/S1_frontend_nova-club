import React from 'react'
import LoginPage from 'app/features/auth/login'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'

const AgentGuard = ({ children }) => {
  const router = useRouter()
  const { asPath, query, replace: nextJsReplace } = router

  const isLoggedIn = useAppSelector((s) => !!s.agent.access_token)

  if (!isLoggedIn) {
    nextJsReplace('/auth/login?t=agent&r=' + asPath)

    return <LoginPage />
  }

  if (query.r) return <LoginPage />

  return children
}

export default AgentGuard
