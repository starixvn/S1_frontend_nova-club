export type DepositPaymentCategoriesArgs = {
  is_mobile: number
  api_key: string
  token: string
  username: string
}

export type DepositPaymentCategoriesResult = {
  payment_cats: {
    auto: CategoryItem[]
    manual: CategoryItem[]
  }
}

type CategoryItem = {
  category_id: string
  category_text: string
  list: BankItem[]
}

export type BankItem = {
  account_icon: string
  bankTypeId: string
  bank_name_local: string
  crypto_protocol: string
  deposit_from: string
  maxDeposit: string
  minDeposit: string
  order: string
  pay_acc_id: string
  player_input_fields: PlayerInputFields[]
}

type PlayerInputFields = {
  field_name: string
  label: string
  type: string
}
