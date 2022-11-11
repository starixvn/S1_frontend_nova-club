import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import FloatQr from 'app/navigation/FloatQr'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { ImageBackground, Platform, useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'

const FloatingQr = () => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { openModal } = useModal()

  const isSuggestions = useAppSelector((s) => s.setting.suggestions)

  const insets = useSafeArea()
  const { theme } = useDripsyTheme()
  const { width } = useWindowDimensions()
  const { width: containerWidth, height: containerHeight } =
    useContainerDimension()

  let right = Math.max(0, (width - theme.sizes.container) / 2)
  right = width > theme.sizes.container ? right - 2 : right

  const handleSuggestions = () => {
    dispatch(SettingActions.disableSuggestions(false))
  }

  const handleQr = () => {
    openModal('ReferralModal')
    dispatch(SettingActions.disableSuggestions(false))
  }

  return (
    <>
      {isSuggestions && (
        <TouchableOpacity
          sx={{
            position: Platform.OS === 'web' ? 'fixed' : 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right,
            width: containerWidth,
            height: containerHeight,
          }}
          onPress={handleSuggestions}
        >
          <ImageBackground
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/blur.png`,
            }}
            style={{ flex: 1 }}
          />
          <View
            sx={{
              position: Platform.OS === 'web' ? 'fixed' : 'absolute',
              top: 75 + insets.top,
              right,
              pb: 60,
              flexDirection: 'row',
              alignItems: 'flex-end',
              zIndex: 10,
            }}
          >
            <Text
              sx={{
                fontSize: 14,
                fontWeight: '900',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {t('referral.refer')}
            </Text>

            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/ic_suggestions_arrow.png`,
              }}
              style={{
                width: 36,
                height: 36,
                marginHorizontal: 12,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      )}
      <View
        sx={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          top: 120 + insets.top,
          right,
        }}
      >
        <FloatQr onPress={handleQr} />
      </View>
    </>
  )
}

export default FloatingQr
