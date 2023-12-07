import { PageWithBackHeader } from 'app/components/layouts/Page'
import useScrollToTop from 'app/hooks/useScrollToTop'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import React, { useRef } from 'react'
import HowTo from './components/HowTo'
import IntroColumn from './components/IntroColumn'
import JackpotPool from './components/JackpotPool'
import MysteryGame from './components/MysteryGame'
import Prize from './components/Prize'
import TnC from './components/TnC'
import WinnerColumn from './components/WinnerColumn'
import useFetchMysteryDrops from './components/useFetchMysteryDrops'

const MysteryDropEvent = () => {
  const { t } = useLocalization()
  const { width } = useWindowResize()
  const scrollRef = useRef(null)

  const primaryPrizeWidth = useResponsiveValue([width * 0.7, width * 0.55])
  const secondaryPrizeWidth = useResponsiveValue([width * 0.45, width * 0.4])

  const { miniPrize, majorPrize, grandPrize, jackpot } = useFetchMysteryDrops()

  const { ScrollToTopButton, setScrollY } = useScrollToTop({
    innerRef: scrollRef,
  })

  return (
    <PageWithBackHeader
      header={{ title: t('event.mystery.title') }}
      disableScrollView
    >
      <ScrollView
        ref={scrollRef}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <View>
          <JackpotPool jackpot={jackpot} />
          <View sx={{ mt: '$3', px: ['$pagePadding', '$5'] }}>
            <View sx={{ alignItems: 'center' }}>
              <Prize
                width={primaryPrizeWidth}
                type="grand"
                prize={grandPrize}
              />
            </View>
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
                mt: [-60, -160],
              }}
            >
              <Prize
                width={secondaryPrizeWidth}
                type="major"
                prize={majorPrize}
              />
              <Prize
                width={secondaryPrizeWidth}
                type="mini"
                prize={miniPrize}
              />
            </View>

            <IntroColumn />
            <WinnerColumn />
            <MysteryGame />
            <HowTo />
            <TnC />
          </View>
        </View>
      </ScrollView>

      {ScrollToTopButton}
    </PageWithBackHeader>
  )
}

export default MysteryDropEvent
