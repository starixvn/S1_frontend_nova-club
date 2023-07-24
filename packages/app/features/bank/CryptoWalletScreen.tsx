import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import React from 'react'
import { usePlayerBankQuery } from 'services/bank'
import { useRouter } from 'solito/router'
import BankCardForm from './components/BankCardForm'

const FLAG_CRYPTO = 3
const CryptoWalletScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()

  const { playerCryptoList, isLoading } = usePlayerBankQuery()

  const handlePress = () => {
    push('/account/bank/add-crypto-wallet')
  }

  return (
    <FormContainer hidePadding>
      <BankCardForm
        bankList={playerCryptoList}
        buttonLabel={t('wallet.addCryptoWallet')}
        isLoading={isLoading}
        onPress={handlePress}
        isCrypto={true}
      />
    </FormContainer>
  )
}

export default CryptoWalletScreen
