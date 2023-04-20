import { Currency } from 'app/utils/constant'

export interface BankAccountItem {
  currency: Currency
  bank_code: string
  acc_no: string
  acc_name: string
  bank_icon: string
  bank_card_id: string
}

export interface AddBankAccount {
  currency: Currency
  bank_code: string
  acc_no: number
  acc_name: string
  OTP: string
}

export interface AddBankAccountArgs {
  currency: Currency
  bank_code: string
  acc_no: string
  acc_name: string
  OTP: string
}

export interface SendOtpArgs {
  mobile_no: string
}

export interface LookUpBank {
  lookup: AvailableBankList[]
}
export interface AvailableBankList {
  bank_code: string
  bank_name: string
  bank_icon: string
}

export interface DeleteBankAccount {
  msg: string
}
export interface DeleteBankAccountArgs {
  id: number
}
