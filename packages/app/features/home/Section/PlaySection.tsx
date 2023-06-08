import Image from 'app/components/common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'

const BUTTON_SIZE = 42
const PlaySection = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()

  const handlePlayNow = () => {
    push('/slot')
  }

  return (
    <RoundContainer>
      <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          sx={{
            borderRadius: 24,
            overflow: 'hidden',
            bg: '#11396E',
            mr: 4,
          }}
        >
          <Text
            sx={{
              p: 8,
              py: 12,
              fontSize: 13,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {t('game.slotgame')}
          </Text>
        </View>
        <StyledText>
          {t('game.rebate')}
          <StyledText sx={{ color: '#EDDB02' }}> 1.2%</StyledText>
        </StyledText>
      </View>

      <BouncePressable
        sx={{
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handlePlayNow}
      >
        <Image
          source={require('app/assets/images/home/play-button.png')}
          resizeMode="contain"
          sx={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        />
        <StyledText
          sx={{
            borderRadius: 24,
            position: 'absolute',
            textAlign: 'center',
            fontSize: 9,
            color: '#FCF03B',
            fontWeight: 'bold',
          }}
        >
          {t('game.playNow')}
        </StyledText>
      </BouncePressable>
    </RoundContainer>
  )
}

const RoundContainer = styled(View)({
  m: 12,
  p: 4,
  bg: '#338FD3',
  borderRadius: 50,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyledText = styled(Text)({
  fontSize: 14,
  fontWeight: 'bold',
})

export default PlaySection
