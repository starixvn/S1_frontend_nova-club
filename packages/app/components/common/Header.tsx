import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import isDesktop from 'app/utils/isDesktop'
import {
  Pressable,
  styled,
  Text,
  useResponsiveValue,
  useSx,
  View,
} from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import Icon from '../Icon'

type HeaderProps = {
  title?: string
  actions?: React.ReactNode
  titleProps?: ComponentProps<typeof Text>
  customBack?: () => void
} & React.ComponentProps<typeof View>

const Header = ({
  title = '',
  actions,
  titleProps = {},
  customBack,
}: HeaderProps) => {
  const isAndroid = Platform.OS === 'android'
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }
  const desktop = isDesktop()

  const { orientation, isLandscape } = useOrientation()

  const { top, right } = useSafeArea()

  const pr = useResponsiveValue(['$4', '$4', 0, 0, 0])

  const sx = useSx()

  const headerHeight = sx({
    height: 'header',
  })

  return (
    <View nativeID="pageback-header">
      <View
        sx={{
          paddingTop: top,
          px: 12,
          bg: desktop ? 'transparent' : '$primary.500',
        }}
      >
        <StyledTop
          sx={{
            ...(isLandscape ? {} : headerHeight),
            px: isLandscape ? 12 : 4,
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={customBack ? customBack : onGoBack}
            sx={{ flex: 0.1 }}
          >
            <Icon name="back" size={isLandscape ? 14 : 20} color="white" />
          </Pressable>
          <View sx={{ flex: 0.8, alignItems: 'center' }}>
            <Text
              numberOfLines={2}
              sx={{
                fontSize: isLandscape ? 14 : 19,
                color: 'white',
                lineHeight: headerHeight.height,
                fontWeight: 'bold',
                textAlign: 'center',
                ...titleProps?.sx,
              }}
              {...titleProps}
            >
              {title.toUpperCase()}
            </Text>
          </View>
          <View
            sx={{
              flex: 0.1,
              alignItems: 'flex-end',
              // pr: actions ? undefined : undefined,
            }}
          >
            {actions && actions}
          </View>
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
