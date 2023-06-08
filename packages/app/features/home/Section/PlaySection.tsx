import Image from 'app/components/common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'

const BUTTON_SIZE = 42
const BUTTON_SIZE_BIG = 52
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
            borderRadius: 50,
            overflow: 'hidden',
            bg: '#11396E',
            mr: [4, 12],
          }}
        >
          <Text
            sx={{
              py: 12,
              px: [8, 20],
              fontSize: [13, 22],
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
          width: [BUTTON_SIZE, BUTTON_SIZE_BIG],
          height: [BUTTON_SIZE, BUTTON_SIZE_BIG],
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handlePlayNow}
      >
        <Image
          source={require('app/assets/images/home/play-button.png')}
          resizeMode="contain"
          sx={{
            width: [BUTTON_SIZE, BUTTON_SIZE_BIG],
            height: [BUTTON_SIZE, BUTTON_SIZE_BIG],
          }}
        />
        <StyledText
          sx={{
            borderRadius: 24,
            position: 'absolute',
            textAlign: 'center',
            fontSize: [9, 11],
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
  fontSize: [14, 24],
  fontWeight: 'bold',
})

export default PlaySection
