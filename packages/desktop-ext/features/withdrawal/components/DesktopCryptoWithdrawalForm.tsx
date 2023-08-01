import WithdrawalAmount from 'app/features/withdrawal/components/WithdrawalAmount'
import WithdrawalConfirm from 'app/features/withdrawal/components/WithdrawalConfirm'
import useCryptoRates from 'app/features/withdrawal/hooks/useCryptoRates'
import useCryptoSelection from 'app/features/withdrawal/hooks/useCryptoSelection'
import useWithdrawalForm from 'app/features/withdrawal/hooks/useWithdrawalForm'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import React, { useEffect, useState } from 'react'
import BankSelection, { AddNewAccount } from './BankSelection'
import SelectWithDropdown from 'app/components/select/SelectWithDropdown'
import EmptyAccount from 'app/features/withdrawal/components/EmptyAccount'
import { SelectOptions } from 'services/common/types'

const DesktopCryptoWithdrawalForm = () => {
  const { t } = useLocalization()
  const [walletAddressList, setWalletAddressList] = useState<SelectOptions[]>(
    []
  )

  const { channelList, bankList, selectedChannel, onPressSelected } =
    useCryptoSelection()

  const { currency, convertedAmount, ratesLoading } = useCryptoRates(
    selectedChannel?.value
  )

  const {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  } = useWithdrawalForm({ isCrypto: true, minMax: selectedChannel?.minMax })

  const { values, isValid, dirty, errors } = formik

  const handleSelectChannel = (value) => {
    onPressSelected(value)
  }

  useEffect(() => {
    const list =
      bankSelectionList?.filter((el) => el.label === selectedChannel?.value) ??
      []

    list && list?.length > 0
      ? handleSelected(list[0]?.value)
      : handleSelected(undefined)
    setWalletAddressList(list)
  }, [selectedChannel])

  const renderEmpty = () => (
    <AddNewAccount isCrypto={true} onPress={handleGoToBank} />
  )
  return (
    <>
      <BankSelection
        isCrypto={true}
        label={t('bank.bank')}
        subtitle={t(`withdrawal.exchangeRates`, {
          crypto: selectedChannel?.value,
        })}
        subtitleNote={`1 ${selectedChannel?.value} = ${currency} ${
          ratesLoading
            ? 0
            : toThousandSeparator(
                convertedAmount ? (100000 / convertedAmount).toString() : '0'
              )
        }`}
        list={channelList}
        selected={selectedChannel?.value}
        onPress={handleSelectChannel}
      />

      {walletAddressList && (
        <SelectWithDropdown
          isLabelValue
          autoTranslate={false}
          label={t('wallet.walletAddress')}
          placeholder={t('placeholder.plsSelectWalletAddress')}
          options={walletAddressList}
          value={values.bank?.BankAccountNumber}
          onSelected={(e) => handleSelected(e)}
          renderEmpty={renderEmpty}
        />
      )}

      <WithdrawalAmount
        isCrypto={true}
        formik={formik}
        minMax={selectedChannel?.minMax}
      />

      <WithdrawalConfirm
        disabled={!isValid || !dirty}
        onPress={withdrawalConfirmation}
      />
    </>
  )
}

export default DesktopCryptoWithdrawalForm
