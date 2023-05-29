export const getCryptoProtocol = (bankCode) => {
  switch (bankCode) {
    case 'USDT-ERC20':
      return 'ERC20'
    case 'USDT-TRC20':
      return 'TRC20'
    case 'BTC':
      return 'BTC'
    case 'ETH':
      return 'ETH'
    default:
      break
  }
}
