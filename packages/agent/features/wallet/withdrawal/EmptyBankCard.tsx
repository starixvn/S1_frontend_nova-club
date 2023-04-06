import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { useDripsyTheme, View } from 'dripsy'

const EmptyBankCard = () => {
  const { theme } = useDripsyTheme()
  const { width } = useContainerDimension()
  const { push } = useContextualRouter()
  const { t } = useAgentLocalization()

  const handleAddBank = () => {
    push('/agent/wallet/withdrawal/add-bank')
  }

  return (
    <Card
      sx={{
        mx: '3%',
        my: '$2',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        sx={{
          width: 200,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          elevation={1}
          leftIcon={{
            name: 'add-round',
            size: 20,
            sx: { mr: '$2' },
          }}
          titleProps={{
            sx: {
              fontWeight: 'bold',
            },
          }}
          sx={{
            shadowColor: '$darkBlueAgent',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}
          onPress={handleAddBank}
        >
          {t('wallet.addNew')}
        </Button>
      </View>
    </Card>
  )
}

export default EmptyBankCard
