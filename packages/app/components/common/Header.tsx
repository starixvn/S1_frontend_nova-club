import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Pressable, styled, Text, useSx, View } from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import Icon from '../Icon'

type HeaderProps = {
  title?: string
  actions?: React.ReactNode
  titleProps?: ComponentProps<typeof Text>
} & React.ComponentProps<typeof View>

const Header = ({ title = '', actions, titleProps = {} }: HeaderProps) => {
  const isAndroid = Platform.OS === 'android'
  const { t } = useLocalization()
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }

  const { orientation, isLandscape } = useOrientation()

  const { top, right } = useSafeArea()

  const sx = useSx()

  const headerHeight = sx({
    height: 'header',
  })

  return (
    <View nativeID="pageback-header">
      <View sx={{ paddingTop: top, px: 12, bg: '$primary.500' }}>
        <StyledTop
          sx={{
            ...(isLandscape ? {} : headerHeight),
            px: isLandscape ? 12 : 4,
          }}
        >
          <Pressable
            onPress={onGoBack}
            sx={{ p: 4, px: 8, paddingLeft: right }}
          >
            <Icon name="back" size={isLandscape ? 14 : 20} color="white" />
          </Pressable>
          <View sx={{ alignItems: 'center', flex: 0.9 }}>
            <Text
              sx={{
                fontSize: isLandscape ? 14 : 20,
                color: 'white',
                fontWeight: 'bold',
                ...titleProps?.sx,
              }}
              {...titleProps}
            >
              {title.toUpperCase()}
            </Text>
          </View>

          {actions && (
            <View sx={{ position: 'absolute', right: isLandscape ? right : 4 }}>
              {actions}
            </View>
          )}
        </StyledTop>
      </View>
    </View>
  )
}

const StyledTop = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})
export default Header
