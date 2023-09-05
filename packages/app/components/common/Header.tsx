import { FONT_TOP_OFFSET } from 'app/constants/font'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import {
  Pressable,
  styled,
  Text,
  useSx,
  View
} from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import Icon from '../Icon'

type HeaderProps = {
  title?: string
  actions?: React.ReactNode
  titleProps?: ComponentProps<typeof Text>
  customBack?: () => void
  image?: string
  leftAligned?: boolean
} & React.ComponentProps<typeof View>

const Header = ({
  title = '',
  actions,
  titleProps = {},
  image,
  customBack,
  leftAligned,
}: HeaderProps) => {
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }
  const desktop = useIsDesktop()

  const { orientation, isLandscape } = useOrientation()

  const { top, right } = useSafeArea()

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
            // justifyContent: 'space-between',
          }}
        >
          <Pressable
            sx={{ flex: 0.1 }}
            onPress={customBack ? customBack : onGoBack}
          >
            <Icon name="back" size={isLandscape ? 14 : 20} color="white" />
          </Pressable>
          <View
            sx={{
              flex: 0.8,
              alignItems: 'center',
            }}
          >
            <Text
              numberOfLines={1}
              {...titleProps}
              sx={{
                width: '100%',
                fontSize: isLandscape ? 14 : 19,
                marginTop: FONT_TOP_OFFSET,
                color: 'white',
                lineHeight: headerHeight.height,
                fontWeight: 'bold',
                textAlign: leftAligned ? 'left' : 'center',
                ...titleProps?.sx,
              }}
            >
              {title.toUpperCase()}
            </Text>
            {!!image && (
              <SolitoImage
                width={180}
                height={180}
                alt={''}
                contentFit="contain"
                style={{ marginTop: Platform.select({ native: -10 }) }}
                src={image}
              />
            )}
          </View>
          <View
            sx={{
              pl: '$1',
              alignItems: 'flex-end',
              ml: 'auto',
              ...(leftAligned ? {} : { flex: 0.1 }),
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
