import Card from 'agent/components/Card'
import Text from 'agent/components/Text'
import IconButton from 'app/components/form/IconButton'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useDripsyTheme, View } from 'dripsy'
import { TouchableOpacity } from 'react-native-gesture-handler'

const EmptyBankCard = () => {
  const { theme } = useDripsyTheme()
  const { width } = useContainerDimension()
  const cardWidth = Math.min(400, width * 0.9)
  const { push } = useContextualRouter()
  const { t } = useLocalization()
  return (
    <Card sx={{ mx: '3%', my: '$2' }}>
      <View
        sx={{
          width: cardWidth,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.$primaryAgent,
            paddingHorizontal: 20,
            paddingVertical: 7,
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => push('/agent/wallet/withdrawal/add-bank')}
        >
          <IconButton name="add-round" size={16} sx={{ mx: '$2' }} disabled />
          <Text sx={{ color: 'white' }}>{t('wallet.addNew')}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

export default EmptyBankCard
