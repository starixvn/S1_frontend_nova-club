import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { LOGOUT_ACTION } from 'app/constant/redux'
import { DepositPaymentCategoriesResult } from 'services/dummyDeposit.type'

export type BankState = {
  depositPayment: DepositPaymentCategoriesResult
}

export const bankInitialState: BankState = {
  depositPayment: null,
}

const bankSlice = createSlice({
  name: 'bank',
  initialState: bankInitialState,
  reducers: {
    setDepositPayment: (
      state,
      action: PayloadAction<DepositPaymentCategoriesResult>
    ) => {
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
