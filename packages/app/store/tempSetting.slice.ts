import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface settingStateProps {
  showPrediction: boolean
}

const initialState: settingStateProps = {
  showPrediction: true,
}

const tempSettingSlice = createSlice({
  name: 'tempSetting',
  initialState,
  reducers: {
    toggleShowPrediction: (state, action: PayloadAction<boolean>) => {
      state.showPrediction = action.payload
    },
  },
})

const { actions, reducer } = tempSettingSlice
export const TempSettingActions = actions
export const tempSettingReducer = reducer
