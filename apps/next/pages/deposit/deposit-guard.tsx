import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const DepositGuard = (
  WrappedComponent: AdaptiveLayoutPage,
  guardType: string
) => {
  const HOC = () => {
    const { data, isFetching } = usePlayerProfileQuery()
    const isPlayerName = !!data?.firstName
    const { replace } = useRouter()
    const { showAlert } = useAlert()
    const { t } = useLocalization()

    useEffect(() => {
      if (data && guardType === 'deposit') {
        if (!isPlayerName) {
          showAlert(
            t('accountVerification.secondaryTitle') +
              '\n' +
              t('accountVerification.remark')
          )
          replace('/account/profile')
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

  return HOC as AdaptiveLayoutPage
}

export default DepositGuard
