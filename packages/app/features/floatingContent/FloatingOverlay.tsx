import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Pressable, View } from 'dripsy'
import React from 'react'

const FloatingOverlay = () => {
  const isDesktop = useIsDesktop()
  const dispatch = useAppDispatch()
  const isLanguageMenuVisible = useAppSelector(
    (s) => s.tempSetting.isLanguageMenuVisible
  )

  const handlePress = () => {
    dispatch(TempSettingActions.setIsOverlayVisible(false))
  }

  return (
    false && (
      <Pressable
        onPress={handlePress}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'black',
          zIndex: 9,
        }}
      />
    )
  )
}

export default FloatingOverlay
