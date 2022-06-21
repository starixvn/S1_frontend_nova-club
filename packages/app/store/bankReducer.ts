import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { DepositPaymentCategoriesResult } from 'app/services/dummyDeposit.type'

export type BankState = {
  depositPayment: DepositPaymentCategoriesResult
}

export const bankInitialState: BankState = {
  depositPayment: undefined,
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
    LOGOUT: () => {
      return bankInitialState
    },
  },
})

const { reducer: bankReducer, actions } = bankSlice
export const BankActions = actions

export default bankReducer
