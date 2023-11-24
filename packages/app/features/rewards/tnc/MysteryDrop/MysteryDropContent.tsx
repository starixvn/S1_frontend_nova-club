import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { View, useResponsiveValue } from 'dripsy'
import React from 'react'
import {
  useGetMysteryCheckQuery,
  useGetMysteryEventQuery,
  useGetMysteryWinnerQuery,
  useSetMysteryClaimQuery,
} from 'services/eventApi'
import HowTo from './HowTo'
import IntroColumn from './IntroColumn'
import JackpotPool from './JackpotPool'
import MysteryGame from './MysteryGame'
import Prize from './Prize'
import TnC from './TnC'
import WinnerColumn from './WinnerColumn'
import { MysteryEventPrize } from 'services/eventApi.type'
import { useRandomInterval } from 'app/hooks/useRandomInterval'
import useFetchMysteryDrops from './useFetchMysteryDrops'

const MysteryDropContent = () => {
  const { t } = useLocalization()
  const { width } = useWindowResize()
  const primaryPrizeWidth = useResponsiveValue([width * 0.7, width * 0.55])
  const secondaryPrizeWidth = useResponsiveValue([width * 0.45, width * 0.4])

  const { data: check } = useGetMysteryCheckQuery()
  const { data: winner } = useGetMysteryWinnerQuery()
  const { data: claim } = useSetMysteryClaimQuery()

  const { miniPrize, majorPrize, grandPrize, jackpot } = useFetchMysteryDrops()

  return (
    <View sx={{ mb: '$5' }}>
      <JackpotPool amount={jackpot} />
      <View sx={{ mt: '$3', px: ['$pagePadding', '$5'] }}>
        <View sx={{ alignItems: 'center' }}>
          <Prize width={primaryPrizeWidth} type="grand" prize={grandPrize} />
        </View>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12,
            mt: [-60, -160],
          }}
        >
          <Prize width={secondaryPrizeWidth} type="major" prize={majorPrize} />
          <Prize width={secondaryPrizeWidth} type="mini" prize={miniPrize} />
        </View>

        <IntroColumn />
        <WinnerColumn />
        <MysteryGame />
        <HowTo />
        <TnC />
      </View>
    </View>
  )
}

export default MysteryDropContent
