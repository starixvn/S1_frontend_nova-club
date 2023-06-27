import React, { useEffect, useState } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useLazyCryptoExchangeRateQuery } from 'services/withdrawal'

const useCryptoRates = (selectedChannel) => {
  const [convertedAmount, setConvertedAmount] = useState(0)
  const { currency } = usePlayerProfileQuery()

  const [getCryptoRates, { isFetching: ratesLoading }] =
    useLazyCryptoExchangeRateQuery()

  useEffect(() => {
    const handleCryptoRates = async () => {
      console.log('selectedChannel', selectedChannel)
      let selectedCrypto
      switch (selectedChannel) {
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

    selectedChannel && handleCryptoRates()
  }, [selectedChannel])

  return {
    currency,
    convertedAmount,
    ratesLoading,
  }
}

export default useCryptoRates
