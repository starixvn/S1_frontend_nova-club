import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'

const GameRewards = () => {
  const { t } = useLocalization()

  return (
    <StyledView>
      <DripsyGradient
        colors={['#133351', '#0D2035']}
        sx={{
          alignItems: 'center',
        }}
      >
        <Text sx={{ color: '#6397B7', py: '$2a', fontSize: 14 }}>
          {t('game.reward')}:{' '}
          <Text sx={{ color: '#FF7070', fontSize: 14 }}>0.5%</Text>
        </Text>
      </DripsyGradient>
    </StyledView>
  )
}

const StyledView = styled(View)({
  borderTopWidth: 1,
  borderColor: '$lightNavyBlue',
  borderBottomWidth: 1,
  shadowColor: '#33A0D0',
  shadowOffset: {
    width: 10,
    height: 0,
  },
  shadowOpacity: 0.6,
  shadowRadius: 4,
  elevation: 20,
})

export default GameRewards
