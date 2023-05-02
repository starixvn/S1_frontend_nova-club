import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import MenuNotice from 'app/components/common/MenuNotice'
import RefreshButton from 'app/components/form/IconButton/RefreshButton'
import RadioGroup, { RadioButtonProps } from 'app/components/form/RadioButton'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { FLAG_PAYMENT_TYPE_CRYPTO, getCryptoColor } from 'app/constant/bank'
import { WITHDRAWAL_NOTES } from 'app/constant/notes'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { ReportCommonStatus } from 'app/utils/constant'
import { Text, View, styled } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { useModal } from 'react-native-modalfy'
import { useCryptoBankQuery, usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useLazyCryptoExchangeRateQuery } from 'services/withdrawal'
import AvailableBalance from './AvailableBalance'
import WithdrawalTransactions from './WithdrawalTransactions'
import WithdrawalForm from './components/WithdrawalForm'

type RadioButton = RadioButtonProps & {
  minMax: { min: number; max: number }
}
const CryptoWithdrawalPage = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { openModal } = useModal()
  const [bankList, setBankList] = useState<PlayerBankResult[]>([])
  const [radioButtons, setRadioButtons] = useState<RadioButton[]>([])
  const [selectedRadio, setSelectedRadio] = useState<RadioButton | undefined>()
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { cryptoBankList } = useCryptoBankQuery(undefined, {
    selectFromResult: ({ data }) => ({
      cryptoBankList: data?.data,
    }),
  })
  const { currency } = usePlayerProfileQuery()
  const { bankData, isLoading, isFetching, isSuccess } = usePlayerBankQuery(
    undefined,
    {
      selectFromResult: (s) => ({
        ...s,
        bankData: s.data?.data?.filter(
          (b) => b.PaymentTypeFlag === FLAG_PAYMENT_TYPE_CRYPTO
        ),
      }),
    }
  )

  const [getCryptoRates, { isFetching: cryptoLoading }] =
    useLazyCryptoExchangeRateQuery()

  useEffect(() => {
    const bankList = cryptoBankList?.map((item, index) => {
      return {
        id: `${index + 1}`,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
        iconColor: getCryptoColor(item),
        label: item.bank_name,
        value: item.bank_code,
        selected: index === 0 ? true : false,
        borderColor: '#F4521B',
        color: '#F4521B',
        labelStyle: { color: 'white', fontWeight: 'bold' },
        minMax: {
          min: Number(item.min_withdrawal_trans),
          max: Number(item.max_withdrawal_trans),
        },
      }
    })
    setRadioButtons(bankList ?? [])
    bankList && setSelectedRadio(bankList[0])
  }, [cryptoBankList])

  //Set bank list according to selected radio button
  useEffect(() => {
    const bank = bankData?.filter((el) => el.BankCode === selectedRadio?.value)
    setBankList(bank ?? [])

    if (selectedRadio) {
      currency && handleCryptoRates(selectedRadio)
    }
  }, [selectedRadio, currency, isFetching])

  const handleCryptoRates = async (selectedRadio) => {
    let selectedCrypto
    switch (selectedRadio?.value) {
      case 'USDT-ERC20':
        selectedCrypto = 'ERC20-USDT'
        break
      case 'USDT-TRC20':
        selectedCrypto = 'TRC20-USDT'
        break
      case 'ETH':
        selectedCrypto = 'ETH'
        break
      case 'BTC':
        selectedCrypto = 'BTC'
        break
      default:
        break
    }

    const { data, success } = await getCryptoRates({
      from_currency: currency,
      to_currency: selectedCrypto,
      type: 'sell',
      Amount: '100000',
    })
      .unwrap()
      .catch((error) => {
        return error
      })

    if (success) setConvertedAmount(Number(data?.converted_amount ?? 0))
    else setConvertedAmount(0)
  }

  const onPressRadioButton = (radioButtonsArray: RadioButton[]) => {
    setRadioButtons(radioButtonsArray)
    setSelectedRadio(radioButtonsArray.find((el) => el.selected === true))
  }

  const handleGoToBankPress = () => {
    SheetManager.hide(ACTION_SHEET_ID.WITHDRAWAL_CRYPTO)

    push('/profile/bank-account/add-crypto-account')
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.cryptoWithdraw'),
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
        {radioButtons.length ? (
          <View sx={{ margin: 12, bg: '$background' }}>
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

        <View sx={{ m: 12, bg: '#FDEDBB', p: '$4', borderRadius: 12 }}>
          <Text sx={{ color: 'black' }}>
            <>
              {t(`withdrawal.cryptoExchangeRates`, {
                crypto: selectedRadio?.value,
              })}
            </>
          </Text>
          <View
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Text sx={{ color: '$accent', fontWeight: 'bold', mr: 8 }}>{`1 ${
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
        <WithdrawalForm
          bankData={bankList}
          bankLoading={isLoading || isFetching}
          onGoToBank={handleGoToBankPress}
          isCrypto={true}
          minMax={selectedRadio?.minMax}
        />

        <WithdrawalTransactions
          status={ReportCommonStatus.PENDING}
          withdrawalType={WITHDRAWAL_TYPE.CRYPTO}
        />
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
}))

export default CryptoWithdrawalPage
