import React, { useEffect, useState } from 'react'
import { PlayerBankResult } from 'services/bank.type'
import RadioGroup, { RadioButtonProps } from 'app/components/form/RadioButton'
import { useCryptoBankQuery, usePlayerBankQuery } from 'services/bank'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useLazyCryptoExchangeRateQuery } from 'services/withdrawal'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { getCryptoColor } from 'app/constants/crypto'

type RadioButton = RadioButtonProps & {
  minMax: { min: number; max: number }
}

const useCryptoSelection = () => {
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
  const { playerCryptoList, isFetching, isLoading } = usePlayerBankQuery()

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
    const bank = playerCryptoList?.filter(
      (el) => el.BankCode === selectedRadio?.value
    )
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

  return {
    bankList,
    radioButtons,
    selectedRadio,
    convertedAmount,
    cryptoLoading,
    onPressRadioButton,
  }
}

export default useCryptoSelection
