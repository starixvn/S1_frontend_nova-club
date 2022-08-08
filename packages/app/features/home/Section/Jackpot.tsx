import NumberAnimator from 'app/components/animated/numberAnimator'
import { Button } from 'app/components/form/Button'
import useLocalization from 'app/provider/localization'
import { Image, styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'

const IMAGE_HEIGHT = 145

interface JackpotProps {}

const StyledImageBackground = styled(ImageBackground)({
  backgroundColor: '$blue',
  minHeight: 300,
  width: '100%',
  mt: '$9',
  alignItems: 'center',
})

const Jackpot = ({}: JackpotProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  return (
    <View>
      <StyledImageBackground
        source={require('../../../assets/images/home/gradient-bg.jpg')}
      >
        <Image
          resizeMode="contain"
          source={require('../../../assets/images/home/jackpot.png')}
          sx={{
            width: 200,
            height: IMAGE_HEIGHT,
            mt: -(IMAGE_HEIGHT / 2.5),
          }}
        />

        <Text sx={{ fontWeight: 'bold', fontSize: '$4' }}>
          {t('game.jackpot')}
        </Text>

        <NumberAnimator
          animateToNumber={123456}
          fontStyle={{
            fontWeight: 'bold',
            fontSize: theme.space['$10'],
            color: '$yellowOrange',
          }}
          sx={{
            mt: '$3a',
          }}
        />

        <View sx={{ mt: '$3a' }}>
          <Button
            variant="md"
            fill={{
              type: 'gradient',
              color: 'yellowOrange',
              start: { x: 0, y: 0 },
              end: { x: 0, y: 1 },
            }}
          >
            <Button.Label
              sx={{
                color: '$dark',
                textTransform: 'capitalize',
                fontSize: '$2',
              }}
            >
              {t('common.playNow')}
            </Button.Label>
          </Button>
        </View>
      </StyledImageBackground>
    </View>
  )
}

export default Jackpot
