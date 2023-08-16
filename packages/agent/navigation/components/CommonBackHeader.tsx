import IconButton from 'agent/components/Icon/IconButton'
import Text from 'agent/components/Text'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'

type HeaderProps = {
  title?: string
  actions?: React.ReactNode
  titleProps?: ComponentProps<typeof Text>
  customRoute?: Function
} & React.ComponentProps<typeof View>

const CommonBackHeader = ({
  title,
  actions,
  titleProps = {},
  customRoute,
  ...rest
}: HeaderProps) => {
  const { sx, ...props } = rest

  const { t } = useAgentLocalization()
  const { back } = useRouter()
  const { width } = useContainerDimension()

  const { top, left, right } = useSafeArea()

  return (
    <View
      sx={{
        position: Platform.OS === 'web' ? 'fixed' : 'relative',
        zIndex: 1,
        width: Platform.OS === 'web' ? width : '100%',
        top: 0,
        bg: '$primaryAgent',
        pt: top,
        pl: left,
        pr: right,
        ...sx,
      }}
      {...props}
    >
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          py: 20,
          px: '$3',
        }}
      >
        <IconButton
          name="arrow-down"
          sx={{ transform: [{ rotateZ: '90deg' }] }}
          size={25}
          onPress={() => (customRoute ? customRoute() : back())}
        />
        <Text sx={{ fontWeight: 'bold', fontSize: '$2', color: 'white' }}>
          {title && t(`${title}`)}
        </Text>
        <View sx={{ width: 20 }} />
      </View>
    </View>
  )
}

export default CommonBackHeader
