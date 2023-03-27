import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import React, { useEffect } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const DepositGuard = (
  WrappedComponent: React.ComponentType,
  guardType: string
) => {
  const HOC = () => {
    const { data, isFetching } = usePlayerProfileQuery()
    const isPlayerName = !!data?.firstName
    const { replace } = useContextualRouter()

    useEffect(() => {
      if (data && guardType === 'deposit') {
        if (!isPlayerName) {
          replace('/profile/account-verification')
        }
      }
      if (data && guardType === 'account-verification') {
        if (isPlayerName) {
          replace('/deposit')
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
