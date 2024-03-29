import LanguageDropdown from 'app/components/navigation/LanguageDropdown'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Pressable, View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'

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
    isLanguageMenuVisible && (
      <>
        <Pressable
          onPress={handlePress}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
          }}
        />
        <LanguageDropdown />
      </>
    )
  )
}

export default FloatingOverlay
