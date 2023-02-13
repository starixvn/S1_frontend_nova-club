import useContextualRouting from 'app/hooks/useContextualRouting'
import React, { useEffect } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

const DepositGuard = (WrappedComponent: React.ComponentType) => {
  const HOC = () => {
    const { data } = usePlayerProfileQuery()
    const isPlayerName = !!data?.firstName
    const { replace } = useRouter()
    const { makeContextualHref } = useContextualRouting()

    useEffect(() => {
      if (!isPlayerName) {
        replace(
          makeContextualHref('/profile/account-verification'),
          `/profile/account-verification`
        )
      }
    }, [])
    if (!isPlayerName) {
      return null
    }
    return <WrappedComponent />
  }

  return HOC
}

export default DepositGuard
