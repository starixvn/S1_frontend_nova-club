import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import BankCardForm from './components/BankCardForm'

const FLAG_BANK = 1
const BankAccountScreen = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { bankList, isLoading } = usePlayerBankQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      bankList:
        data?.data?.filter((el) => el.PaymentTypeFlag === FLAG_BANK) || [],
      isLoading,
    }),
  })

  const handlePress = () => {
    push('/profile/bank-account/add-bank-account')
  }

  return (
    <BankCardForm
      bankList={bankList}
      buttonLabel={t('bank.addBankAccount')}
      isLoading={isLoading}
      onPress={handlePress}
      isCrypto={false}
    />
  )
}

export default BankAccountScreen
