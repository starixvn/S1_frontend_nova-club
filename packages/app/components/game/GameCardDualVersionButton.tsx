import { Text, styled } from 'dripsy'
import TouchableOpacity from '../pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { FONT_TOP_OFFSET } from 'app/constants/font'

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
      <GameButton
        sx={{
          backgroundColor: '$secondary.550',
          borderColor: '$secondary.150',
          mb: 12,
        }}
        onPress={onPressPlayNow}
      >
        <Text
          sx={{
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
          numberOfLines={1}
        >
          {t('common.playNow')}
        </Text>
      </GameButton>
      <GameButton
        sx={{
          backgroundColor: '$primary.300',
          borderColor: '$primary.100',
        }}
        onPress={onPressDesktop}
      >
        <Text
          sx={{
            mt: FONT_TOP_OFFSET,
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {t('common.desktop')}
        </Text>
      </GameButton>
    </>
  )
}

export default GameCardDualVersionButton

const GameButton = styled(TouchableOpacity)({
  borderWidth: 2,
  borderRadius: 12,
  p: 2,
  width: '40%',
  maxWidth: 70,
  justifyContent: 'center',
})
