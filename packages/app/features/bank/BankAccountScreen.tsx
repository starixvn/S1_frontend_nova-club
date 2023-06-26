import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import { useRouter } from 'solito/router'
import BankCardForm from './components/BankCardForm'

const BankAccountScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { playerBankList, isLoading } = usePlayerBankQuery()

  const handlePress = () => {
    push('/account/bank/add-bank-account')
  }

  return (
    <BankCardForm
      bankList={playerBankList}
      buttonLabel={t('bank.addBankAccount')}
      isLoading={isLoading}
      onPress={handlePress}
      isCrypto={false}
    />
  )
}

export default BankAccountScreen
