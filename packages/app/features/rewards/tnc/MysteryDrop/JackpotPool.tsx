import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toThousandSeparator } from 'app/utils'
import { Text, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const JackpotPool = () => {
  const { width } = useWindowResize()
  const isDesktop = useIsDesktop()
  const logoWidth = useResponsiveValue([width, 400])

  const locale = useAppSelector((s) => s.setting.locale)

  const logo = isDesktop
    ? `banner-desktop-${locale}.png`
    : `banner-mobile-${locale}.png`

  return (
    <View sx={{ mb: '$4' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/bg-jackpot.png`}
        alt=""
        width={width}
        height={width * 0.802}
        style={{ position: 'absolute' }}
      />
      <View sx={{ justifyContent: 'center', alignItems: 'center', mt: '$4' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${logo}`}
          alt=""
          width={logoWidth}
          height={200}
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
        <Text sx={{ textAlign: 'center' }}>
          {t('event.mystery.totalJackpot')}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 36,
            color: 'yellow',
            fontWeight: 'bold',
          }}
        >
          {`VND ${toThousandSeparator('123456789')}`.toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default JackpotPool
