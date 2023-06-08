import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import WinnerList from './components/WinnerList'
import { usePredictionWinnerListQuery } from 'services/eventApi'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'

const PredictionWinner = () => {
  const { t } = useLocalization()
  const { winnerList } = usePredictionWinnerListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      winnerList: data?.data?.rows,
    }),
  })
  const luckyDrawList = winnerList?.slice(0, 10)
  const jackpotList = winnerList?.slice(10)

  return (
    <PageWithBackHeader
      header={{ title: 'Prediction Winner' }}
      sx={{ bg: '#031051' }}
    >
      <Image
        source={require('app/assets/images/logo.png')}
        resizeMode="contain"
        sx={{
          mt: 24,
          height: [48, 60],
        }}
      />
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <LogoImage
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/ucl.png`,
          }}
          resizeMode="contain"
        />
        <LogoImage
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/istanbul.png`,
          }}
          resizeMode="contain"
        />
      </View>

      <Text
        sx={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', mb: 24 }}
      >
        {t('event.winnerList')}
      </Text>

      <WinnerList label={t('event.luckyDraw')} list={luckyDrawList} />
      <WinnerList label={t('event.jackpot')} list={jackpotList} />
    </PageWithBackHeader>
  )
}

const LogoImage = styled(Image)({
  height: [100],
  width: ['30%', '20%'],
})

export default PredictionWinner
