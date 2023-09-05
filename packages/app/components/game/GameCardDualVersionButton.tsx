import { Text } from 'dripsy'
import TouchableOpacity from '../pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'

type GameCardDualVersionButtonProps = {
  onPressPlayNow: () => void
  onPressDesktop: () => void
}

const GameCardDualVersionButton = ({
  onPressPlayNow,
  onPressDesktop,
}: GameCardDualVersionButtonProps) => {
  const { t } = useLocalization()
  return (
    <>
      <TouchableOpacity
        sx={{
          backgroundColor: '$secondary.300',
          borderWidth: 2,
          borderRadius: 5,
          borderColor: '$secondary.100',
          p: 2,
          width: '40%',
          mb: '$2',
        }}
        onPress={onPressPlayNow}
      >
        <Text
          sx={{
            fontSize: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {t('common.playNow')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        sx={{
          backgroundColor: '$primary.300',
          borderWidth: 2,
          borderRadius: 5,
          borderColor: '$primary.100',
          p: 2,
          width: '40%',
        }}
        onPress={onPressDesktop}
      >
        <Text
          sx={{
            fontSize: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {t('common.desktop')}
        </Text>
      </TouchableOpacity>
    </>
  )
}

export default GameCardDualVersionButton
