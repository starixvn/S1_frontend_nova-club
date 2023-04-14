import { getProviderLogo } from 'app/config/games/provider'

export enum ACTION_SHEET_ID {
  BASE = 'base',
  SQUARE = 'square',
  WITHDRAWAL = 'withdraw',
  WITHDRAWAL_CRYPTO = 'withdrawCrypto',
  AUTO_DEPOSIT = 'autoDeposit',
  LOCAL_BANK = 'localBank',
  ADD_BANK_ACCOUNT = 'addBankAccount',
  CHANNEL = 'channel',
  PROTOCOL = 'protocol',
}

export const OPTIONS_ALL = {
  label: 'common.all',
  value: 'all',
  icon: getProviderLogo('all'),
}
