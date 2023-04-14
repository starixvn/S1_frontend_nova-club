export const MAP_CRYPTO_PROTOCOL = {
  95: 'USDT ERC20',
  97: 'USDT TRC20',
  99: 'BTC',
  101: 'ETH',
  0: 'ETH',
}

export const CRYPTO_CHANNEL = [
  {
    label: 'USDT',
    value: 'USDT',
  },
]

export const FLAG_PAYMENT_TYPE_BANK = 1
export const FLAG_PAYMENT_TYPE_CRYPTO = 3

export const getCryptoColor = (item) => {
  switch (item?.bank_code) {
    case 'USDT-TRC20':
      return '#E40927'
    case 'BTC':
      return '#F6931A'
    case 'ETH':
      return '#627EEA'
    default:
      return '#36A07B'
  }
}

export const getCryptoProtocol = (item) => {
  switch (item?.bank_code) {
    case 'BTC':
      return 'BTC'
    case 'ETH':
      return 'ETH'
    default:
      return 'USDT'
  }
}
