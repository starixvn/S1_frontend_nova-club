import Image from 'app/components/common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import { MotiText, MotiView } from 'moti'
import React, { useMemo } from 'react'

const BUTTON_SIZE = 42
const BUTTON_SIZE_BIG = 52
const PlaySection = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()

  const handlePlayNow = () => {
    push('/slot')
  }

  const animatedText = useMemo(
    () => (
      <StyledMotiView
        key="rebate"
        from={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
        sx={{
          ml: [4, 8],
        }}
      >
        <StyledText sx={{ fontSize: 14, color: '#EDDB02' }}>1.2%</StyledText>
      </StyledMotiView>
    ),
    []
  )

  const animatedButton = useMemo(
    () => (
      <StyledMotiView
        key="play"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
        sx={{
          borderRadius: 24,
          position: 'absolute',
          textAlign: 'center',
        }}
      >
        <StyledText
          sx={{
            fontSize: [9, 11],
            color: '#FCF03B',
            fontWeight: 'bold',
          }}
        >
          {t('game.playNow')}
        </StyledText>
      </StyledMotiView>
    ),
    []
  )

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
          <StyledText
            sx={{
              py: 12,
              px: [8, 20],
              fontSize: [13, 22],
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {t('game.slotgame')}
          </StyledText>
        </View>
        <Row>
          <StyledText>{t('game.rebate')}</StyledText>
          {animatedText}
        </Row>
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
        {animatedButton}
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
  fontSize: [13, 24],
  fontWeight: 'bold',
})

const StyledMotiView = styled(MotiView)({})
export default PlaySection
