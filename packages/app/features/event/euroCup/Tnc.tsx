import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import EuroBackground from './components/EuroBackground'
import { TitleText } from './components/EuroText'
import Prizes from './components/Prizes'
import TermsConditions from './components/TermsConditions'

const Tnc = () => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([150, 150, 200])
  const contentWidth = useResponsiveValue(['100%', 550, 700, 700, 800])

  return (
    <EuroBackground>
      <View sx={{ alignItems: 'center', px: '$3', mt: '3%' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/mascot-tnc.png`}
          width={imageWidth}
          height={imageWidth * (302 / 242)}
          contentPosition="top center"
          alt=""
        />
        <TitleText>{t('common.tnc')}</TitleText>
        <Title2Text>{t('event.euro.tnc.subtitle')}</Title2Text>
        <SubtitleText>{t('event.euro.tnc.date1')}</SubtitleText>
        <SubtitleText>{t('event.euro.tnc.date2')}</SubtitleText>

        <View sx={{ width: contentWidth }}>
          <Prizes />
          <TermsConditions />
        </View>
      </View>
    </EuroBackground>
  )
}

const Title2Text = styled(Text)({
  color: '#FFCE00',
  fontWeight: 'bold',
  textAlign: 'center',
})
const SubtitleText = styled(Text)({
  textAlign: 'center',
})

export default Tnc
