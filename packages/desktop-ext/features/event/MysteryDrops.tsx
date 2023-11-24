import HowTo, { DesktopHowTo } from 'app/features/rewards/tnc/MysteryDrop/HowTo'
import IntroColumn, {
  DekstopIntroColumn,
} from 'app/features/rewards/tnc/MysteryDrop/IntroColumn'
import JackpotPool from 'app/features/rewards/tnc/MysteryDrop/JackpotPool'
import MysteryGame from 'app/features/rewards/tnc/MysteryDrop/MysteryGame'
import Prize from 'app/features/rewards/tnc/MysteryDrop/Prize'
import TnC from 'app/features/rewards/tnc/MysteryDrop/TnC'
import WinnerColumn, {
  DesktopWinnerColumn,
} from 'app/features/rewards/tnc/MysteryDrop/WinnerColumn'
import useFetchMysteryDrops from 'app/features/rewards/tnc/MysteryDrop/useFetchMysteryDrops'
import MysteryDropTnc from 'app/features/rewards/tnc/MysteryDropTnc'
import useWindowResize from 'app/hooks/useWindowResize'
import { Container, Row, View, useResponsiveValue } from 'dripsy'
import React from 'react'

const MysteryDrops = () => {
  const { width } = useWindowResize()
  const primaryPrizeWidth = 330
  const secondaryPrizeWidth = 300

  const { miniPrize, majorPrize, grandPrize } = useFetchMysteryDrops()
  return (
    <>
      <JackpotPool />
      <Container sx={{ gap: '$sectionBottomSpace', maxWidth: 1000 }}>
        <View>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 12,
              mt: [-60, -160, 0],
            }}
          >
            <Prize
              width={secondaryPrizeWidth}
              type="major"
              prize={majorPrize}
            />
            <Prize width={primaryPrizeWidth} type="grand" prize={grandPrize} />
            <Prize width={secondaryPrizeWidth} type="mini" prize={miniPrize} />
          </View>

          <Row sx={{ justifyContent: 'space-evenly', mb: '$4' }}>
            <View sx={{ flex: 0.45 }}>
              <DekstopIntroColumn />
            </View>
            <View sx={{ flex: 0.45 }}>
              <DesktopWinnerColumn />
            </View>
          </Row>

          <MysteryGame />
          <DesktopHowTo />
          <TnC />
        </View>
      </Container>
    </>
  )
}

export default MysteryDrops
