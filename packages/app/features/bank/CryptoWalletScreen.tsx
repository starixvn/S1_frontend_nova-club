import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import BankCardForm from './components/BankCardForm'
import { useRouter } from 'solito/router'

const FLAG_CRYPTO = 3
const CryptoWalletScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()

  const { playerCryptoList, isLoading } = usePlayerBankQuery()

  const handlePress = () => {
    push('/bank/add-crypto-wallet')
  }

  return (
    <BankCardForm
      bankList={playerCryptoList}
      buttonLabel={t('wallet.addCryptoWallet')}
      isLoading={isLoading}
      onPress={handlePress}
      isCrypto={true}
    />
  )
}

export default CryptoWalletScreen
