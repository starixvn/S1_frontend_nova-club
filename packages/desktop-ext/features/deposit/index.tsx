import useDepositList from 'app/features/deposit/tools/useDepositList'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Text } from 'dripsy'
import React, { useEffect } from 'react'
import { useRouter } from 'solito/router'

const DepositScreen = () => {
  const { paymentMethodList, isUninitialized } = useDepositList()
  const { replace } = useRouter()
  const { t } = useLocalization()

  useEffect(() => {
    if (paymentMethodList && paymentMethodList.length > 0) {
      const firstMethod = paymentMethodList[0]
      firstMethod && replace(firstMethod.path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodList])

  if (isUninitialized)
    return (
      <ActivityIndicator
        color="$primary.200"
        sx={{ mt: '$4' }}
        size={'large'}
      />
    )

  if (!paymentMethodList || paymentMethodList.length === 0)
    return <Text sx={{ mx: '$3', my: '$4' }}>{t('deposit.noMethod')}</Text>

  return null
}

export default DepositScreen
