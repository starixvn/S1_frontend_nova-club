import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import WithdrawalAmount from 'app/features/withdrawal/components/WithdrawalAmount'
import WithdrawalConfirm from 'app/features/withdrawal/components/WithdrawalConfirm'
import useWithdrawalForm from 'app/features/withdrawal/hooks/useWithdrawalForm'
import useLocalization from 'app/provider/localization'
import React from 'react'
import BankSelection from './BankSelection'
import useCryptoSelection from 'app/features/withdrawal/hooks/useCryptoSelection'

type WithdrawalFormProps = {
  isCrypto: boolean
  minMax?: { min: number; max: number }
}

const DesktopWithdrawalForm = ({ isCrypto, cryptoChannel,  minMax }: WithdrawalFormProps) => {
  const { t } = useLocalization()

  const {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  } = useWithdrawalForm({ isCrypto, minMax })

  const { values, isValid, dirty } = formik

  const handleSelect = (value) => {
    handleSelected(value)
  }

  return (
    <>
      <BankSelection
        isCrypto={isCrypto}
        label={t('bank.bank')}
        subtitle={
          isCrypto
            ? 'CHAIN: USDT-TRC20 Current exchange rate'
            : t('bank.selectBank')
        }
        subtitleNote="1 USDT-TRC20 = VND 23,483.77"
        list={bankSelectionList}
        selected={values.bank?.BankAccountNumber}
        onPress={handleSelect}
        onAddNewAccount={handleGoToBank}
      />

      <WithdrawalAmount isCrypto={isCrypto} formik={formik} minMax={minMax} />

      <WithdrawalConfirm
        disabled={!isValid || !dirty}
        onPress={withdrawalConfirmation}
      />
    </>
  )
}

export default DesktopWithdrawalForm
