import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { PaymentMethodProps } from 'app/config/deposit'
import { LOGOUT_ACTION } from 'app/constant/redux'

type DepositPaymentProps = PaymentMethodProps & {
  categoryText: string
  list: []
}
export type BankState = {
  depositPayment: DepositPaymentProps | null
}

export const bankInitialState: BankState = {
  depositPayment: null,
}

const bankSlice = createSlice({
  name: 'bank',
  initialState: bankInitialState,
  reducers: {
    setDepositPayment: (state, action: PayloadAction<DepositPaymentProps>) => {
      state.depositPayment = action.payload
    },
  },
  extraReducers: {
    [LOGOUT_ACTION]: () => {
      return bankInitialState
    },
  },
})

const { reducer: bankReducer, actions } = bankSlice
export const BankActions = actions

export default bankReducer
