import useContextualRouting from 'app/hooks/useContextualRouting'
import React, { useEffect } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

const DepositGuard = (
  WrappedComponent: React.ComponentType,
  guardType: string
) => {
  const HOC = () => {
    const { data, isFetching } = usePlayerProfileQuery()
    const isPlayerName = !!data?.firstName
    const { replace } = useRouter()
    const { makeContextualHref } = useContextualRouting()

    useEffect(() => {
      if (data && guardType === 'deposit') {
        if (!isPlayerName) {
          replace(
            makeContextualHref('/profile/account-verification'),
            `/profile/account-verification`
          )
        }
      }
      if (data && guardType === 'account-verification') {
        if (isPlayerName) {
          replace('/', '/')
        }
      }
    }, [isFetching])

    if (data === undefined || isFetching) {
      return HOC
    }

    if (guardType === 'deposit') {
      if (!isPlayerName) {
        return HOC
      }
    }

    if (guardType === 'account-verification') {
      if (isPlayerName) {
        return HOC
      }
    }
    return <WrappedComponent />
  }

  return HOC
}

export default DepositGuard
