import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import BankCardForm from './components/BankCardForm'
import { useRouter } from 'solito/router'

const FLAG_CRYPTO = 3
const CryptoWalletScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()

  const { bankList, isLoading } = usePlayerBankQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      bankList:
        data?.data?.filter((el) => el.PaymentTypeFlag === FLAG_CRYPTO) || [],
      isLoading,
    }),
  })

  const handlePress = () => {
    push('/account/profile/bank/add-crypto-wallet')
  }

  return (
    <BankCardForm
      bankList={bankList}
      buttonLabel={t('wallet.addCryptoWallet')}
      isLoading={isLoading}
      onPress={handlePress}
      isCrypto={true}
    />
  )
}

export default CryptoWalletScreen
