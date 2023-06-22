import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import useLocalization from 'app/provider/localization'
import { toCleanCard } from 'app/utils'
import React from 'react'
import useWithdrawalForm from '../hooks/useWithdrawalForm'
import EmptyAccount from './EmptyAccount'
import WithdrawalAmount from './WithdrawalAmount'
import WithdrawalConfirm from './WithdrawalConfirm'
import AvailableBalance from './AvailableBalance'

type WithdrawalFormProps = {
  isCrypto: boolean
  minMax?: { min: number; max: number }
}

const WithdrawalForm = ({ isCrypto, minMax }: WithdrawalFormProps) => {
  const { t } = useLocalization()

  const {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  } = useWithdrawalForm({ isCrypto, minMax })

  const { values, isValid, dirty } = formik

  const renderEmpty = (closeActionSheet) => (
    <EmptyAccount
      label={isCrypto ? t('wallet.addCryptoWallet') : t('bank.addBankAccount')}
      onClose={handleGoToBank}
      onCloseActionSheet={closeActionSheet}
    />
  )

  return (
    <>
      <SelectWithCardGrid
        label={isCrypto ? t('bank.walletAddress') : t('bank.bankAcc')}
        subtitle={values.bank?.BankName}
        placeholder={
          isCrypto
            ? t('placeholder.plsSelectCrypto')
            : t('placeholder.plsSelectBank')
        }
        options={bankSelectionList}
        value={
          isCrypto
            ? values.bank?.BankAccountNumber
            : toCleanCard(values.bank?.BankAccountNumber ?? '')
        }
        sx={{ width: '100%', mb: '$3' }}
        onSelected={(e) => handleSelected(e)}
        renderEmpty={renderEmpty}
      />

      <WithdrawalAmount isCrypto={isCrypto} formik={formik} minMax={minMax} />

      <WithdrawalConfirm
        disabled={!isValid || !dirty}
        onPress={withdrawalConfirmation}
      />
    </>
  )
}

export default WithdrawalForm
