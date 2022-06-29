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
  success_url: string
  username?: string
}

export type SubmitDepositResult = {
  result: boolean
}

/**
 * *Submit manual deposit
 */
export type SubmitManualDepositArgs = {
  acc_name: string
  amount: number
  bank_type_id: number
  username?: string
}

export type SubmitManualDepositResult = {
  result: boolean
}

/**
 * *Deposit Payment List
 */
export type DepositPaymentListArgs = {
  username: string
}

export type DepositPaymentListResult = {
  result: {
    auto: CategoryItem[]
    manual: CategoryItem[]
  }
}

type CategoryItem = {
  category_id: number
  category_text: string
  list: AutoBankItem[] | ManualBankItem[]
}

export type AutoBankItem = {
  account_icon: string
  bankTypeId: number
  bank_name_local: string
  deposit_from: number
  maxDeposit: string
  minDeposit: string
  order: number
  pay_acc_id: number
  player_input_fields: PlayerInputFieldsAmount | PlayerInputFieldsBank
}

export type ManualBankItem = {
  bankTypeId: number
  bank_acc_name: string
  bank_acc_no: string
  bank_branch: string
  maxDeposit: string
  minDeposit: string
  pay_acc_id: string
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
