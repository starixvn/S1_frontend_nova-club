/**
 * *Submit deposit
 */
export type SubmitDepositArgs = {
  amount: number
  bank: string
  bank_type_id: number
  card_code: number
  card_seri: number
  card_type: string
  deposit_from: number
  fail_url: string
  home_url: string
  name: string
  payment_account_id: number
  process_url: string
  success_url: string
  username?: string
  player_bank_details_id?: number
}

export type SubmitDepositResult = {
  result: boolean
  type: number
  url: string
}

export type SubmitDepositCryptoItem = {
  invoice_amount: string
  invoice_currency: string
  message: string
  payment_address: string
  payment_amount: string
  payment_token: string
  rates: string
  transaction_id: string
  type: number
}

/**
 * *Submit manual deposit
 */
export type SubmitManualDepositArgs = {
  acc_name: string
  amount: number
  bank_type_id: number
  payment_account_id: number
  username?: string
  reference_code?: string
}

export type SubmitManualDepositResult = {
  secure_id: string
}

/**
 * *Upload Receipt
 */
export type UploadDepositSlipArgs = {
  secure_id: string
  file: File
}

/**
 * *Deposit Payment List
 * is_mobile
 * 0: pc
 * 1: mobile
 */
export type DepositPaymentListArgs = {
  username?: string
  is_mobile: 0 | 1
}

export type DepositPaymentListResult = {
  result: {
    auto: CategoryItem[]
    manual: CategoryItem[]
  }
}

export type CategoryItem = {
  category_id: number
  category_text: string
  list: AutoBankItem[] | ManualBankItem[]
}

export type AutoBankItem = {
  account_icon_file_path: string
  account_icon: string
  bankTypeId: number
  bank_icon: string
  bank_name_local: string
  deposit_fee_percentage?: string
  deposit_from: number
  maxDeposit: string
  minDeposit: string
  order: number
  pay_acc_id: number
  payment_account_name: string
  player_input_fields: Record<
    string,
    PlayerInputFieldsAmount | PlayerInputFieldsBank
  >
  vendor_percentage?: string
}

export type ManualBankItem = {
  bankTypeId: number
  bank_acc_name: string
  bank_acc_no: string
  bank_branch: string
  maxDeposit: string
  minDeposit: string
  order: number
  pay_acc_id: number
  bankQR: string
  referenceCode: string
}

export type PlayerInputFieldsAmount = {
  field_name: string
  label_lang: string
  type: string
}

export type PlayerInputFieldsBank = {
  bank_tree?: object
  topup_card_tree?: object
  field_name: string
  label_lang: string
  name: string
  type: string
}

export type AvailableDepositAmountResult = {
  current: string
  max: string
}

export type DepositEWalletQRInfo = {
  bankAccount: string
  bankAccountName: string
  bank: string
  referenceId: string
  transactionId: string
  amount: string
  deposit_amount: string
  depositAmount: string
  type: string
  qrString: string
}
