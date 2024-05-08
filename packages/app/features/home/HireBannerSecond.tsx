import { FONT_TOP_OFFSET } from 'app/constants/font'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import { AnimatedButton } from './HireBanner'

export default function HireBannerSecond() {
  const { t } = useLocalization()
  const { push } = useRouter()
  // const direction = useResponsiveValue(['column', 'column', 'column', 'row'])
  const showTime = useResponsiveValue([false, true])
  const token = useAppSelector((state) => state.auth.info?.token)
  const lang = useAppSelector((state) => state.setting.locale)
  const { openModal } = useModal()
  const isDesktop = useIsDesktop()

  const handlePress = () => {
    if (token) {
      if (isDesktop) {
        push('/rewards/redeem/list')
        setTimeout(() => {
          openModal('DailyCheckInModal')
        }, 500)
      } else {
        push('/rewards/daily')
      }
    } else {
      isDesktop ? openModal('RegisterModal') : push('/auth/register/?t=member')
    }
  }

  const animatedText = useMemo(
    () => (
      <MotiView
        key={t('home.banner2.n3')}
        from={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
        style={{
          justifyContent: 'center',
        }}
      >
        <Label sx={{ color: '#00FFFF' }}>{t('home.banner2.n3')}</Label>
      </MotiView>
    ),
    [t('home.banner2.n3')]
  )

  return (
    <Pressable onPress={handlePress}>
      <Row
        sx={{
          borderRadius: 40,
          bg: '$primary.200',
          p: ['$1', '$1', '$1', '$2'],
          minHeight: 60,
        }}
      >
        <View
          sx={{
            borderRadius: 30,
            bg: '$primary.500',
            px: ['$2', '$3'],
            justifyContent: 'center',
            flex: [0.25, 0.35, 0.35, 0.4],
          }}
        >
          <Label
            sx={{
              fontWeight: '900',
              textAlign: 'center',
            }}
          >
            {t('home.banner2.n1')}
          </Label>
        </View>
        <Row
          sx={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View
            sx={{
              mx: '$1',
              px: ['$1', '$2'],
              flex: 1,
            }}
          >
            <Label sx={{ flex: 1, color: '$secondary.100' }}>
              {t('home.banner2.n2')}
            </Label>
            <Label sx={{ flex: 1, alignItems: 'center' }}>{animatedText}</Label>
          </View>

          <AnimatedButton>{t('home.banner2.button')}</AnimatedButton>
        </Row>
      </Row>
    </Pressable>
  )
}

const Label = styled(Text)({
  mt: FONT_TOP_OFFSET,
  fontSize: [11, 12, 12, 11, 12],
  lineHeight: [13, 15, 15, 13, 15],
  fontWeight: 'bold',
})
