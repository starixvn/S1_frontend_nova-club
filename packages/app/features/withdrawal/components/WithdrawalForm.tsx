import Select from 'app/components/select/Select'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { SelectOptions } from 'services/common/types'
import { ChannelList, ChannelRadioButton } from '../hooks/useCryptoSelection'
import useWithdrawalForm from '../hooks/useWithdrawalForm'
import EmptyAccount from './EmptyAccount'
import WithdrawalAmount from './WithdrawalAmount'
import WithdrawalConfirm from './WithdrawalConfirm'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'

type WithdrawalFormProps = {
  isCrypto: boolean
  selectedChannel?: ChannelRadioButton | ChannelList | undefined
}

const WithdrawalForm = ({ isCrypto, selectedChannel }: WithdrawalFormProps) => {
  const { t } = useLocalization()

  const { data: availableBalance } = useGetAvailableWithdrawalAmountQuery()

  const withdrawalMinMax = { min: 30000000, max: 1000000000 }

  const [walletAddressList, setWalletAddressList] = useState<SelectOptions[]>(
    []
  )

  const {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  } = useWithdrawalForm({
    isCrypto,
    minMax: isCrypto ? selectedChannel?.minMax : withdrawalMinMax,
  })

  const { values, isValid, dirty } = formik

  useEffect(() => {
    const list =
      bankSelectionList
        ?.filter((el) => el.label === selectedChannel?.value)
        .map((el) => {
          return { ...el, label: el.value }
        }) ?? []

    list && list?.length > 0
      ? handleSelected(list[0]?.value)
      : handleSelected(undefined)
    setWalletAddressList(list)
  }, [selectedChannel])

  const renderEmpty = (closeActionSheet) => {
    return (
      <View sx={{ p: '$4', width: '100%', height: '100%' }}>
        <EmptyAccount
          label={
            isCrypto ? t('wallet.addCryptoWallet') : t('bank.addBankAccount')
          }
          onClose={handleGoToBank}
          onCloseActionSheet={closeActionSheet}
        />
      </View>
    )
  }

  return (
    <>
      {isCrypto ? (
        <Select
          autoTranslate={false}
          label={isCrypto ? t('bank.walletAddress') : t('bank.bankAccount')}
          subtitle={values.bank?.BankName}
          placeholder={t('placeholder.plsSelectWalletAddress')}
          options={walletAddressList}
          onSelected={(e) => handleSelected(e?.value)}
          value={values.bank?.BankAccountNumber ?? ''}
          _input={{
            placeholderTextColor: '$white',
            inputSx: { opacity: values.bank?.BankAccountNumber ? 1 : 0.5 },
          }}
          _actionSheet={{
            sheetId: t('bank.walletAddress'),
          }}
          _actionSheetContent={
            walletAddressList && walletAddressList.length === 0
              ? ({ closeActionSheet }) => renderEmpty(closeActionSheet)
              : undefined
          }
        />
      ) : (
        <SelectWithCardGrid
          label={isCrypto ? t('bank.walletAddress') : t('bank.bankAccount')}
          subtitle={values.bank?.BankName}
          placeholder={
            isCrypto
              ? t('placeholder.plsSelectCrypto')
              : t('placeholder.plsSelectBank')
          }
          options={bankSelectionList}
          value={values.bank?.BankAccountNumber ?? ''}
          sx={{ width: '100%', mb: '$3' }}
          onSelected={(e) => handleSelected(e)}
          renderEmpty={renderEmpty}
        />
      )}

      <WithdrawalAmount
        isCrypto={isCrypto}
        formik={formik}
        minMax={isCrypto ? selectedChannel?.minMax : withdrawalMinMax}
      />

      <WithdrawalConfirm
        disabled={!isValid || !dirty || !Number(availableBalance?.balance)}
        onPress={withdrawalConfirmation}
      />
    </>
  )
}

export default WithdrawalForm
