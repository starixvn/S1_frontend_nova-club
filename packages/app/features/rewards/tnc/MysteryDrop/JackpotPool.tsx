import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toThousandSeparator } from 'app/utils'
import { Text, View, useResponsiveValue } from 'dripsy'
import React, { useState } from 'react'
import { SolitoImage } from 'solito/image'
import { CountUp } from 'use-count-up'
import useFetchMysteryDrops from './useFetchMysteryDrops'

const JackpotPool = () => {
  const { width } = useWindowResize()
  const isDesktop = useIsDesktop()

  const bgWidth = useResponsiveValue([width, width, width])
  const bgHeight = isDesktop ? bgWidth * 0.5625 : width * 0.802
  const logoWidth = useResponsiveValue([width, 600, 600, 1000])
  const logoHeight = isDesktop ? logoWidth * 0.3 : logoWidth * 0.5387

  const locale = useAppSelector((s) => s.setting.locale)

  const background = isDesktop ? 'bg-jackpot-desktop.jpg' : 'bg-jackpot.png'
  const logo = isDesktop
    ? `banner-desktop-${locale}.png`
    : `banner-mobile-${locale}.png`

  return (
    <View sx={{ mb: '$4', position: 'relative' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${background}`}
        alt=""
        width={bgWidth}
        height={bgHeight}
        style={{ position: 'absolute' }}
      />

      <View sx={{ justifyContent: 'center', alignItems: 'center', mt: '$4' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${logo}`}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />

        <JackpotBoard />
      </View>
    </View>
  )
}

const JackpotBoard = () => {
  const { t } = useLocalization()
  const { width } = useWindowResize()
  const jackpotWidth = useResponsiveValue([width - width * 0.1, 500])
  const [prevPrize, setPrevPrize] = useState(0)

  const { jackpot } = useFetchMysteryDrops()

  return (
    <View
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-jackpot.png`}
        alt=""
        width={jackpotWidth}
        height={jackpotWidth * 0.443}
      />
      <View
        sx={{
          position: 'absolute',
        }}
      >
        <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
          {t('event.mystery.totalJackpot')}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            fontSize: [36, 42],
            color: 'yellow',
            fontWeight: 'bold',
          }}
        >
          {`VND `}
          <CountUp
            key={jackpot}
            isCounting
            start={prevPrize}
            end={jackpot}
            duration={3}
            easing="easeOutCubic"
            thousandsSeparator=","
            onComplete={() => setPrevPrize(Number(jackpot))}
          />
        </Text>
      </View>
    </View>
  )
}

export default JackpotPool
