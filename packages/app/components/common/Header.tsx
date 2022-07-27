import BouncePressable from 'app/pressable/BouncePressable'
import { SafeAreaView, styled, Text, useSx, View } from 'dripsy'
import { Platform, StatusBar } from 'react-native'
import { useRouter } from 'solito/router'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import useLocalization from 'app/provider/localization'
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const Header = ({ title }: { title: string }) => {
  const isAndroid = Platform.OS === 'android'
  const { t } = useLocalization()
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }

  const [currentOrientation, setCurrentOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_DOWN
  )
  useEffect(() => {
    const subs = ScreenOrientation.addOrientationChangeListener((s) => {
      setCurrentOrientation(s.orientationInfo.orientation)
    })

    return () => ScreenOrientation.removeOrientationChangeListener(subs)
  }, [])

  const { top } = useSafeArea()

  const isLandscape =
    currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
    currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT

  const sx = useSx()

  const headerHeight = sx({
    height: 'header',
  })
  return (
    <View
      nativeID="pageback-header"
      sx={{
        borderBottomWidth: 1,
        borderBottomColor: '#33A0D0',
      }}
    >
      <DripsyGradient
        sx={{
          paddingTop: top,
        }}
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StyledTop
          sx={{
            ...(isLandscape ? {} : headerHeight),
            px: isLandscape ? '$6' : '$2',
          }}
        >
          <BouncePressable
            onPress={onGoBack}
            sx={{ p: isLandscape ? '$0a' : '$2' }}
          >
            <Icon
              name="chevleft"
              size={isLandscape ? 14 : 20}
              color="#9CD9FA"
            />
          </BouncePressable>
          <View sx={{ alignItems: 'center', flex: 0.9 }}>
            <Text
              sx={{
                fontSize: isLandscape ? 14 : 20,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {t(title)}
            </Text>
          </View>
        </StyledTop>
      </DripsyGradient>
    </View>
  )
}

const StyledTop = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})
export default Header
