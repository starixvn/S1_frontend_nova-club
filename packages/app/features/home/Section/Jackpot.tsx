import NumberAnimator from 'app/components/animated/numberAnimator'
import { Button } from 'app/components/form/Button'
import SkeletonPlaceholder from 'app/components/skeleton/SkeletonPlaceholder'
import useLocalization from 'app/provider/localization'
import { Image, styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'
import { useGetJackpotAmountQuery } from 'services/contentApi'
import { useRouter } from 'solito/router'

const IMAGE_HEIGHT = 180

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
  const { push } = useRouter()

  const { data, isLoading } = useGetJackpotAmountQuery()
  const { increment = '0', jackpotAmount = '0' } = data?.data || {}

  return (
    <SkeletonPlaceholder show={isLoading} height={330}>
      {data && (
        <StyledImageBackground
          source={require('../../../assets/images/home/jackpot-bg.jpg')}
        >
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/home/jackpot-animated.gif')}
            sx={{
              width: 250,
              height: 180,
              marginTop: '-15%',
            }}
          />

          {/* <Text sx={{ fontWeight: 'bold', fontSize: '$4' }}>
            {t('game.jackpot')}
          </Text> */}

          <NumberAnimator
            animateToNumber={parseInt(jackpotAmount)}
            timerIncrementValue={parseInt(increment)}
            fontStyle={{
              fontWeight: 'bold',
              fontSize: theme.space['$10'],
              color: '$yellowOrange',
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
              onPress={() => {
                push('/slot')
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
      )}
    </SkeletonPlaceholder>
  )
}

export default Jackpot
