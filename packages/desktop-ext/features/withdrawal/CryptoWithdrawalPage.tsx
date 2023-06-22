import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import RefreshButton from 'app/components/RefreshButton'
import RadioGroup, { RadioButtonProps } from 'app/components/form/RadioButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { FLAG_PAYMENT_TYPE_CRYPTO, getCryptoColor } from 'app/constants/crypto'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { ReportCommonStatus, WITHDRAWAL_NOTES } from 'app/utils/constant'
import { Text, View, styled } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useCryptoBankQuery, usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useLazyCryptoExchangeRateQuery } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import DesktopPage from 'desktop-ext/components/layout/DesktopPage'
import useCryptoSelection from 'app/features/withdrawal/hooks/useCryptoSelection'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import DesktopWithdrawalForm from './components/DesktopWithdrawalForm'
import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'

type RadioButton = RadioButtonProps & {
  minMax: { min: number; max: number }
}
const CryptoWithdrawalPage = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  const { currency } = usePlayerProfileQuery()
  const {
    bankList,
    cryptoLoading,
    radioButtons,
    selectedRadio,
    convertedAmount,
    onPressRadioButton,
  } = useCryptoSelection()
  console.log(
    '🚀 ~ file: CryptoWithdrawalPage.tsx:42 ~ CryptoWithdrawalPage ~ convertedAmount:',
    convertedAmount
  )
  console.log(
    '🚀 ~ file: CryptoWithdrawalPage.tsx:42 ~ CryptoWithdrawalPage ~ selectedRadio:',
    selectedRadio
  )
  console.log(
    '🚀 ~ file: CryptoWithdrawalPage.tsx:42 ~ CryptoWithdrawalPage ~ radioButtons:',
    radioButtons
  )

  return (
    <DesktopPage>
      <StyledView>
        <AvailableBalance />

        {radioButtons.length ? (
          <View sx={{ mb: 12 }}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              containerStyle={{
                padding: 12,
                alignItems: 'flex-start',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 12,
              }}
            />
          </View>
        ) : null}

        <View sx={{ mb: 24, bg: '$secondary.500', p: '$3', borderRadius: 12 }}>
          <Text sx={{ color: 'black' }}>
            <>
              {t(`withdrawal.exchangeRates`, {
                crypto: selectedRadio?.value,
              })}
            </>
          </Text>
          <View
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Text sx={{ color: 'black', fontWeight: 'bold', mr: 8 }}>{`1 ${
              selectedRadio?.value
            } = ${currency} ${
              cryptoLoading
                ? 0
                : toThousandSeparator(
                    convertedAmount ? (100000 / convertedAmount).toString() : ''
                  )
            }`}</Text>
            <RefreshButton
              loading={cryptoLoading}
              onPress={() => handleCryptoRates(selectedRadio)}
              _icon={{ color: '$accent' }}
            />
          </View>
        </View>
        <DesktopWithdrawalForm
          bankData={bankList}
          isCrypto={true}
          minMax={selectedRadio?.minMax}
        />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.CRYPTO}
      />
    </DesktopPage>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default CryptoWithdrawalPage
