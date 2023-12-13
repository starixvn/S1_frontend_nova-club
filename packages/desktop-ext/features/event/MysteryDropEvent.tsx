import { DesktopHowTo } from 'app/features/event/mysteryDrop/components/HowTo'
import { DekstopIntroColumn } from 'app/features/event/mysteryDrop/components/IntroColumn'
import JackpotPool from 'app/features/event/mysteryDrop/components/JackpotPool'
import MysteryGame from 'app/features/event/mysteryDrop/components/MysteryGame'
import Prize from 'app/features/event/mysteryDrop/components/Prize'
import TnC from 'app/features/event/mysteryDrop/components/TnC'
import { DesktopWinnerColumn } from 'app/features/event/mysteryDrop/components/WinnerColumn'
import useFetchMysteryDrops from 'app/features/event/mysteryDrop/components/useFetchMysteryDrops'
import useTncHandler from 'app/hooks/useTncHandler'
import { Container, Row, View } from 'dripsy'
import React from 'react'

const MysteryDropEvent = () => {
  const primaryPrizeWidth = 330
  const secondaryPrizeWidth = 300

  const { miniPrize, majorPrize, grandPrize, jackpot } = useFetchMysteryDrops()

  useTncHandler()

  return (
    <>
      <JackpotPool jackpot={jackpot} />
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
          <View sx={{ mx: '$4' }}>
            <TnC />
          </View>
        </View>
      </Container>
    </>
  )
}

export default MysteryDropEvent
