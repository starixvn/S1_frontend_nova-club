import WithdrawalAmount from 'app/features/withdrawal/components/WithdrawalAmount'
import WithdrawalConfirm from 'app/features/withdrawal/components/WithdrawalConfirm'
import useWithdrawalForm from 'app/features/withdrawal/hooks/useWithdrawalForm'
import useLocalization from 'app/provider/localization'
import React from 'react'
import BankSelection from './BankSelection'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'

const DesktopWithdrawalForm = () => {
  const { t } = useLocalization()
  const { data: availableBalance } = useGetAvailableWithdrawalAmountQuery()
  const withdrawalMinMax = { min: 50000, max: 1000000000 }

  const {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  } = useWithdrawalForm({ isCrypto: false, minMax: withdrawalMinMax })

  const { values, isValid, dirty } = formik

  const handleSelect = (value) => {
    handleSelected(value)
  }

  return (
    <>
      <BankSelection
        label={t('bank.bank')}
        subtitle={t('bank.selectBank')}
        list={bankSelectionList}
        selected={values.bank?.BankAccountNumber}
        onPress={handleSelect}
        onAddNewAccount={handleGoToBank}
      />

      <WithdrawalAmount
        isCrypto={false}
        formik={formik}
        minMax={withdrawalMinMax}
      />

      <WithdrawalConfirm
        disabled={!isValid || !dirty || !Number(availableBalance?.balance)}
        onPress={withdrawalConfirmation}
      />
    </>
  )
}

export default DesktopWithdrawalForm
