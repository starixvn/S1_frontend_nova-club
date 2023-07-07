import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
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
    <FormContainer padding>
      <BankCardForm
        bankList={playerBankList}
        buttonLabel={t('bank.addBankAccount')}
        isLoading={isLoading}
        onPress={handlePress}
        isCrypto={false}
      />
    </FormContainer>
  )
}

export default BankAccountScreen
