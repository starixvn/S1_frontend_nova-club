/**
 * *Get Player withdrawal bank list
 */
export type PlayerWithdrawalBankArgs = {
  username: string
}

export type PlayerWithdrawalBankResult = {
  BankAccountFullName: string
  BankAccountNumber: string
  BankAddress: string
  BankCode: string
  BankIcon: string
  BankName: string
  BankTypeId: number
  BankTypeOrder: number
  Branch: string
  City: string
  CreatedOn: string
  Currency: string
  CustomBankName: string
  DefaultPaymentFlag: number
  DeletedOn: string
  DwBank: string
  EnabledDeposit: number
  EnabledWithdrawal: number
  ExternalID: string
  ExternalSystemId: string
  ExtraInfo: string
  IsDefault: string
  IsRemember: string
  PaymentTypeFlag: number
  Phone: string
  PlayerBankDetailsId: number
  PlayerId: number
  Protocol: string
  Province: string
  Status: string
  UpdatedOn: string
  Verified: string
}

/**
 * *Add Player withdrawal bank account
 */
export type addWithdrawalBankAccResult = {
  reulst: boolean
}

export type addWithdrawalBankAccArgs = {
  bank_acc_name: string
  bank_acc_num: string
  bank_address: string
  bank_type_id: number
  branch: string
  city: string
  province: string
  username: string
}

/**
 * *Delete Player withdrawal bank account
 */
export type deleteWithdrawalBankAccResult = {
  reulst: boolean
}

export type deleteWithdrawalBankAccArgs = {
  bank_acc_num: string
  bank_type_id: number
  username: string
}

/**
 * *General Withdrawal bank list
 */
export type WithdrawalBankResult = {
  bank_code: number
  bank_name: string
  id: number
}

export type WithdrawalBankArgs = {
  username: string
}
