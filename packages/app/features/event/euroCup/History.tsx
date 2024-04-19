import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import EuroBackground from './components/EuroBackground'
import { TitleText } from './components/EuroText'
import HistoryTable from './components/HistoryTable'

const History = () => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([150, 150, 200])

  return (
    <EuroBackground>
      <View sx={{ alignItems: 'center', px: '$3', mt: '3%' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/mascot-history.png`}
          width={imageWidth}
          height={imageWidth * (276 / 273)}
          contentPosition="top center"
          alt=""
        />
        <TitleText>{t('common.history')}</TitleText>
        <HistoryTable />
      </View>
    </EuroBackground>
  )
}

export default History
