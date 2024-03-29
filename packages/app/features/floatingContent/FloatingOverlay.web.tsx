import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Pressable } from 'dripsy'
import React from 'react'

const FloatingOverlay = () => {
  const dispatch = useAppDispatch()
  const isLanguageMenuVisible = useAppSelector(
    (s) => s.tempSetting.isLanguageMenuVisible
  )

  const handlePress = () => {
    dispatch(TempSettingActions.setIsOverlayVisible(false))
  }

  return (
    isLanguageMenuVisible && (
      <>
        <Pressable
          onPress={handlePress}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
      </>
    )
  )
}

export default FloatingOverlay
