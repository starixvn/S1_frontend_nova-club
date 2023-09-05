import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { toThousandSeparator } from 'app/utils'
import { Pressable, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { useGetCoinQuery } from 'services/rewardApi'
import { SolitoImage } from 'solito/image'

const TutorialScreen = () => {
  const { t } = useLocalization()
  const dispatch = useAppDispatch()
  const location = useAppSelector((s) => s.setting.tutorialLocation)

  const { data: balance } = useGetCoinQuery()

  const { top } = useSafeArea()

  const arrowWidth = useResponsiveValue([50, 60, 70])
  const arrowX = useResponsiveValue([100, 120, 150])
  const arrowTextX = useResponsiveValue([140, 130, 180])
  const arrowTextY = useResponsiveValue([100, 100, 100])
  const arrowTextWidth = useResponsiveValue([280, 280, 350])

  const handlePress = () => {
    dispatch(SettingActions.toggleTriggerPopupTutorial(false))
  }

  return (
    <Pressable
      onPress={handlePress}
      sx={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      {location && (
        <>
          <StyleOverlayView>
            <StyleHighlightView location={location}>
              <SolitoImage
                src={require('app/assets/images/rewards/btn_rewards.png')}
                alt="icon"
                width={50}
                height={20}
              />
              <Text
                sx={{
                  mt: FONT_TOP_OFFSET,
                  fontSize: [12, 14],
                  color: '$secondary.100',
                  pr: '$1',
                  minWidth: 40,
                  textAlign: 'right',
                }}
              >
                {Number(balance) > 9999
                  ? '9,999+'
                  : toThousandSeparator(balance)}
              </Text>
            </StyleHighlightView>
          </StyleOverlayView>
          <StyleArrowContainer top={location ? location?.fy - 30 : 0}>
            <SolitoImage
              src={require('app/assets/images/common/arrow.png')}
              alt="arrow"
              width={arrowWidth}
              height={arrowWidth * 1.5}
              style={{
                position: 'absolute',
                top: 50,
                left: location ? location?.fx + arrowX : 0,
              }}
            />
            <View
              sx={{
                width: arrowTextWidth,
                position: 'absolute',
                top: arrowTextY,
                left: location ? location?.fx - arrowTextX : 0,
              }}
            >
              <Text
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '$secondary.100',
                  mb: '$1',
                }}
              >
                {t('tutorial.note1')}
              </Text>
              <Text sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {t('tutorial.note2')}
              </Text>
            </View>
          </StyleArrowContainer>
        </>
      )}
    </Pressable>
  )
}

const StyleOverlayView = styled(View)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  bg: 'rgba(0,0,0,0.8)',
  zIndex: 10,
})

const StyleHighlightView = styled(View)(({ location }) => ({
  position: 'absolute',
  width: [100, 120, 150],
  // height: 28,
  top: location ? location?.fy - 2 : 0,
  left: location?.fx ?? 0,
  zIndex: 77,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 4,
  borderRadius: 24,
  borderColor: '$primary.50',
  bg: 'black',
}))

const StyleArrowContainer = styled(View)(({ top }) => ({
  position: 'absolute',
  top: top,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 12,
}))

export default TutorialScreen
