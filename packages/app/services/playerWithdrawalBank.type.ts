export type PlayerWithdrawalBankResult = {
  bankAccountFullName: string
  bankAccountNumber: string
  bankName: string
  bankTypeId: string
  branch: string
  charge_percentage: string
  city: string
  cryptoFlag: string
  dwBank: string
  isDefault: string
  payment_type_flag: string
  playerBankDetailsId: string
  province: string
}

export type PlayerWithdrawalBankArgs = {
  username: string
}
