import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import BankCardForm from './components/BankCardForm'

const FLAG_CRYPTO = 3
const CryptoWalletScreen = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { bankList, isLoading } = usePlayerBankQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      bankList:
        data?.data?.filter((el) => el.PaymentTypeFlag === FLAG_CRYPTO) || [],
      isLoading,
    }),
  })

  const handlePress = () => {
    push('/profile/bank-account/add-crypto-account')
  }

  return (
    <BankCardForm
      bankList={bankList}
      buttonLabel={t('bank.addCryptoAccount')}
      isLoading={isLoading}
      onPress={handlePress}
      isCrypto={true}
    />
  )
}

export default CryptoWalletScreen
