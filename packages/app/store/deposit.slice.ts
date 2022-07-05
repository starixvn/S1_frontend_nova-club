import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DepositConfirmation {
  image?: string
  callback?: Function
  isVisible?: boolean
  amount: number
}

export interface DepositState {
  confirmation?: DepositConfirmation
}

const initialState: DepositState = {}

const depositSlice = createSlice({
  name: 'deposit',
  initialState: initialState,
  reducers: {
    setConfirmation: (
      state,
      action: PayloadAction<Omit<DepositConfirmation, 'isVisible'>>
    ) => {
      state.confirmation = {
        ...action.payload,
        isVisible: true,
      }
    },
    hideConfirmation: (state) => {
      if (state.confirmation) state.confirmation.isVisible = false
    },
  },
})

const { actions, reducer } = depositSlice

export const DepositActions = actions
export const depositReducer = reducer
