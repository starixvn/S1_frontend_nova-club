import { StackHeaderProps } from '@react-navigation/stack'
import IconButton from 'agent/components/Icon/IconButton'
import Text from 'agent/components/Text'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'

interface CustomStackHeaderProps {
  props: StackHeaderProps
}

const CommonBackHeader = (
  props: StackHeaderProps & { specifyBackRoutes?: string }
) => {
  const { left, right, top, bottom } = useSafeArea()
  const { t } = useLocalization()
  const { options, specifyBackRoutes } = props
  const headerTitle = options.title
  const { back, replace, push } = useContextualRouter()

  return (
    <View
      sx={{
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
        {/* specifyBackRoute ? replace('/agent/wallet') : */}
        <IconButton
          name="arrow-down"
          size={25}
          sx={{ transform: [{ rotateZ: '90deg' }] }}
          onPress={() => (specifyBackRoutes ? push('/agent/wallet') : back())}
        />
        <Text sx={{ fontWeight: 'bold', fontSize: '$2', color: 'white' }}>
          {t(`${headerTitle}`)}
        </Text>
        <View sx={{ width: 20 }} />
      </View>
    </View>
  )
}

export default CommonBackHeader
