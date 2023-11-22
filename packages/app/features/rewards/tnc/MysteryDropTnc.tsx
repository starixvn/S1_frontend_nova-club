import { PageWithBackHeader } from 'app/components/layouts/Page'
import useWindowResize from 'app/hooks/useWindowResize'
import { View, useResponsiveValue } from 'dripsy'
import React from 'react'
import IntroColumn from './MysteryDrop/IntroColumn'
import MysteryGame from './MysteryDrop/MysteryGame'
import WinnerColumn from './MysteryDrop/WinnerColumn'
import JackpotPool from './MysteryDrop/JackpotPool'
import Prize from './MysteryDrop/Prize'
import HowTo from './MysteryDrop/HowTo'
import TnC from './MysteryDrop/TnC'
import useLocalization from 'app/provider/localization'

const MysteryDropTnc = () => {
  const { t } = useLocalization()
  const { width } = useWindowResize()
  const primaryPrizeWidth = useResponsiveValue([width * 0.7, width * 0.55])
  const secondaryPrizeWidth = useResponsiveValue([width * 0.45, width * 0.4])

  return (
    <PageWithBackHeader header={{ title: t('event.mystery.title') }}>
      <View sx={{ mb: '$5' }}>
        <JackpotPool />
        <View sx={{ mt: '$3', px: ['$pagePadding', '$5'] }}>
          <View sx={{ alignItems: 'center' }}>
            <Prize width={primaryPrizeWidth} type="grand" />
          </View>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 12,
              mt: [-60, -160],
            }}
          >
            <Prize width={secondaryPrizeWidth} type="major" />
            <Prize width={secondaryPrizeWidth} type="mini" />
          </View>

          <IntroColumn />
          <WinnerColumn />
          <MysteryGame />
          <HowTo />
          <TnC />
        </View>
      </View>
    </PageWithBackHeader>
  )
}

export default MysteryDropTnc
