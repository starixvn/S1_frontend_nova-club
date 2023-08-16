import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { RadioButtonProps } from 'app/components/form/RadioButton'
import { getCryptoColor } from 'app/constants/crypto'
import { useEffect, useState } from 'react'
import { useCryptoBankQuery, usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'

export type MinMax = {
  minMax?: { min: number; max: number }
}

export type ChannelRadioButton = RadioButtonProps & MinMax

export type ChannelList = {
  icon: string
  label: string
  value: string
} & MinMax

const useCryptoSelection = () => {
  const [bankList, setBankList] = useState<PlayerBankResult[]>([])
  const [radioButtons, setRadioButtons] = useState<ChannelRadioButton[]>([])
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelRadioButton | ChannelList | undefined
  >()

  const { data: cryptoBankList } = useCryptoBankQuery()
  const { playerCryptoList, isFetching, isLoading } = usePlayerBankQuery()

  const [channelList, setChannelList] = useState<ChannelList[]>([])

  //Parse crypto list for selection
  useEffect(() => {
    const newList = cryptoBankList?.map((item, index) => {
      return {
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
        label: item.bank_name,
        value: item.bank_code,
        minMax: {
          min: Number(item.min_withdrawal_trans),
          max: Number(item.max_withdrawal_trans),
        },
      }
    })

    setChannelList(newList ?? [])

    newList && setSelectedChannel(newList[0])
  }, [cryptoBankList])

  //Parse for radio group
  useEffect(() => {
    const radioList = channelList?.map((item, index) => {
      return {
        ...item,
        id: `${index + 1}`,
        iconColor: getCryptoColor(item),
        selected: index === 0 ? true : false,
        borderColor: '#F4521B',
        color: '#F4521B',
        labelStyle: { color: 'white', fontWeight: 'bold' },
      }
    })

    setRadioButtons(radioList ?? [])
    radioList && setSelectedChannel(radioList[0])
  }, [channelList])

  //Set bank list according to selected channel
  useEffect(() => {
    const bank = playerCryptoList?.filter(
      (el) => el.BankCode === selectedChannel?.value
    )
    setBankList(bank ?? [])
  }, [selectedChannel, isFetching])

  const onPressRadioButton = (radioButtonsArray: ChannelRadioButton[]) => {
    setRadioButtons(radioButtonsArray)
    setSelectedChannel(radioButtonsArray.find((el) => el.selected === true))
  }

  const onPressSelected = (value) => {
    const channel = channelList.find((el) => el.value === value)
    setSelectedChannel(channel)
  }

  return {
    channelList,
    bankList,
    radioButtons,
    selectedChannel,
    onPressSelected,
    onPressRadioButton,
  }
}

export default useCryptoSelection
