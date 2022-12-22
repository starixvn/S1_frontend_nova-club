import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import NumberAnimator from 'app/components/animated/numberAnimator'
import { Button } from 'app/components/form/Button'
import SkeletonPlaceholder from 'app/components/skeleton/SkeletonPlaceholder'
import useContainerDimension from 'app/hooks/useContainerDimension'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Image, styled, Text, useDripsyTheme, View } from 'dripsy'
import { Video } from 'expo-av'
import React from 'react'
import { ImageBackground } from 'react-native'
import { useGetJackpotAmountQuery } from 'services/contentApi'
import { useRouter } from 'solito/router'
import JackpotGamesSection from './JackpotGamesSection'

const IMAGE_HEIGHT = 180

interface JackpotProps {}

const Jackpot = ({}: JackpotProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { push } = useRouter()
  const { width } = useContainerDimension()

  const { data, isLoading } = useGetJackpotAmountQuery()
  const { increment = '0', jackpotAmount = '0' } = data?.data || {}

  const jackpotHeight = (width * 550) / 768 + 35

  return (
    <SkeletonPlaceholder show={isLoading} height={jackpotHeight}>
      {data && (
        <StyledImageBackground
        // source={{ uri: `${MEDIA_DOMAIN}${CONTENT_URI}/home/jackpot-bg.jpg` }}
        >
          <Video
            isMuted
            isLooping
            shouldPlay
            style={{
              position: 'absolute',
              // top: 0,
              // bottom: 0,
              // left: 0,
              // right: 0,
              width: '100%',
              minHeight: '100%',
              aspectRatio: 384 / 275,
            }}
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/videos/bg-jackpot.mp4`,
            }}
            resizeMode="contain"
            useNativeControls={false}
          />
          <Image
            resizeMode="contain"
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/home/jackpot-animated.gif`,
            }}
            sx={{
              width: '100%',
              height: width * 0.3,
              marginTop: ['-10%', '-2%', '-2%'],
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
              fontSize: [theme.space['$7'], theme.space['$10']],
              color: 'red',
            }}
          />

          <View sx={{ my: ['5%', '$4', '5%'] }}>
            <TouchableOpacity onPress={() => push('/slot')}>
              <StyledImage
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/home/jackpot-button.gif`,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </StyledImageBackground>
      )}
      {!isLoading && <JackpotGamesSection />}
    </SkeletonPlaceholder>
  )
}

const StyledImageBackground = styled(View)({
  width: '100%',
  mt: '$9',
  alignItems: 'center',
})

const StyledImage = styled(Image)({
  width: 300,
  height: [36, 60],
})
export default Jackpot
