import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import { MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { CountUp } from 'use-count-up'

type JackpotProp = {
  jackpot: number | undefined
}

const JackpotPool = ({ jackpot }: JackpotProp) => {
  const { width } = useWindowResize()
  const isDesktop = useIsDesktop()

  const bgWidth = useResponsiveValue([width, width, width])
  const bgHeight = isDesktop ? bgWidth * 0.5625 : width * 0.802
  const logoWidth = useResponsiveValue([width, 600, 600, 1000])
  const logoHeight = isDesktop ? logoWidth * 0.3 : logoWidth * 0.5387

  const locale = useAppSelector((s) => s.setting.locale)

  const background = isDesktop ? 'bg-jackpot-desktop.jpg' : 'bg-jackpot.png'
  const logo = isDesktop
    ? `logo-desktop-${locale}.png`
    : `logo-mobile-${locale}.png`
  const logoElement = isDesktop ? `logo-desktop` : `logo-mobile`

  const animateElement01 = useMemo(
    () => (
      <MotiView
        key={'element01'}
        from={{ translateY: -10 }}
        animate={{ translateY: 10 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
          delay: 500,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${logoElement}-01.png`}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />
      </MotiView>
    ),
    []
  )

  const animateElement02 = useMemo(
    () => (
      <MotiView
        key={'element02'}
        from={{ translateY: -10 }}
        animate={{ translateY: 10 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${logoElement}-02.png`}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />
      </MotiView>
    ),
    []
  )

  return (
    <View sx={{ mb: '$4', position: 'relative' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${background}`}
        alt=""
        width={bgWidth}
        height={bgHeight}
        style={{ position: 'absolute' }}
      />

      <View sx={{ position: 'relative', mt: '$4', alignItems: 'center' }}>
        {animateElement01}
        {animateElement02}

        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${logo}`}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />

        <JackpotBoard jackpot={jackpot} />
      </View>
    </View>
  )
}

const JackpotBoard = ({ jackpot }: JackpotProp) => {
  const { t } = useLocalization()
  const { width } = useWindowResize()
  const jackpotWidth = useResponsiveValue([width - width * 0.1, 500])
  const [total, setTotal] = useState<number>()
  const [prevPrize, setPrevPrize] = useState<number>()
  const currency = useAppSelector((s) => s.setting.currency)

  useEffect(() => {
    setTimeout(() => {
      setTotal(jackpot)
    }, 1000)
  }, [jackpot])

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
          alignItems: 'center',
        }}
      >
        <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
          {t('event.mystery.totalJackpot')}
        </Text>
        <Row>
          <JackpotText>
            <CountUp
              key={jackpot}
              isCounting={!!total}
              start={prevPrize ? prevPrize : total}
              end={total}
              duration={5}
              easing="easeOutCubic"
              thousandsSeparator=","
              onComplete={() => setPrevPrize(total)}
            />
          </JackpotText>
          <JackpotText>{` ${currency.toUpperCase()}`}</JackpotText>
        </Row>
      </View>
    </View>
  )
}

const JackpotText = styled(Text)({
  textAlign: 'right',
  fontSize: [28, 32, 36, 42],
  color: 'yellow',
  fontWeight: 'bold',
  lineHeight: 40,
  fontFamily: 'arial',
  fontVariant: 'tabular-nums',
})

export default JackpotPool
