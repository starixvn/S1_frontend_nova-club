import { StackHeaderProps } from '@react-navigation/stack'
import IconButton from 'agent/components/Icon/IconButton'
import Text from 'agent/components/Text'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useSx, View } from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'

type HeaderProps = {
  title?: string
  actions?: React.ReactNode
  titleProps?: ComponentProps<typeof Text>
} & React.ComponentProps<typeof View>

const CommonBackHeader = ({ title, actions, titleProps = {} }: HeaderProps) => {
  const isAndroid = Platform.OS === 'android'
  const { t } = useLocalization()
  const { back } = useContextualRouter()

  const { top, right } = useSafeArea()

  const sx = useSx()

  const headerHeight = sx({
    height: 'header',
  })

  return (
    <View
      sx={{
        position: Platform.OS === 'web' ? 'fixed' : 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 'container',
        top: 0,
        backgroundColor: '$primaryAgent',
        paddingTop: top,
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          py: '$3',
          px: '$6',
        }}
      >
        <IconButton
          name="arrow-down"
          sx={{ transform: [{ rotateZ: '90deg' }] }}
          size={25}
          onPress={() => back()}
        />
        <Text sx={{ fontWeight: 'bold', fontSize: '$2', color: 'white' }}>
          {t(`${title}`)}
        </Text>
        <View sx={{ width: 20 }} />
      </View>
    </View>
  )
}

export default CommonBackHeader
