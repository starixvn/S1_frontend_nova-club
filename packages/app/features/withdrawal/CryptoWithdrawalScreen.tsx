import RefreshButton from 'app/components/RefreshButton'
import RadioGroup from 'app/components/form/RadioButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { ReportCommonStatus, WITHDRAWAL_NOTES } from 'utils/constant'
import DailyMax from '../deposit/component/DailyMax'
import AvailableBalance from './components/AvailableBalance'
import WithdrawalForm from './components/WithdrawalForm'
import WithdrawalTransactions from './components/WithdrawalTransactions'
import useCryptoRates from './hooks/useCryptoRates'
import useCryptoSelection from './hooks/useCryptoSelection'

const CryptoWithdrawalScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  const {
    channelList,
    bankList,
    radioButtons,
    selectedChannel,
    onPressSelected,
    onPressRadioButton,
  } = useCryptoSelection()

  const { data: availAmount } = useGetAvailableWithdrawalAmountQuery()
  const { currency, convertedAmount, ratesLoading } = useCryptoRates(
    selectedChannel?.value
  )

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.cryptoWithdrawal'),
        actions: (
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', { notice: WITHDRAWAL_NOTES })
            }
          />
        ),
      }}
    >
      <StyledView>
        <AvailableBalance />
        <DailyMax
          type="withdrawal"
          amount={availAmount?.current}
          dailyMax={availAmount?.max}
          sx={{ mb: '$3' }}
        />

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
                crypto: selectedChannel?.value,
              })}
            </>
          </Text>
          <View
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Text sx={{ color: 'black', fontWeight: 'bold', mr: 8 }}>{`1 ${
              selectedChannel?.value
            } = ${currency} ${
              ratesLoading
                ? 0
                : toThousandSeparator(
                    convertedAmount ? (100000 / convertedAmount).toString() : ''
                  )
            }`}</Text>
            <RefreshButton
              loading={ratesLoading}
              // onPress={() => handleCryptoRates(selectedChannel)}
              _icon={{ color: '$accent' }}
            />
          </View>
        </View>
        <WithdrawalForm isCrypto={true} selectedChannel={selectedChannel} />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.CRYPTO}
      />
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default CryptoWithdrawalScreen
