import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

export default function HireBanner() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const lang = useAppSelector((state) => state.setting.locale)
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const isDesktop = useIsDesktop()
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  // const direction = useResponsiveValue(['column', 'column', 'column', 'row'])
  const show = useResponsiveValue([false, true])
  const handleDesktopAccountVerification = () => {
    showAlert(
      t('accountVerification.secondaryTitle') +
        '\n' +
        t('accountVerification.remark')
    )
    push('/account/profile-details')
  }
  const animatedText = useMemo(
    () => (
      <MotiView
        key={lang}
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
        <Label sx={{ color: '#00FFFF' }}>{t('home.banner.n3')}</Label>
      </MotiView>
    ),
    [lang]
  )

  const handlePress = () => {
    token
      ? !playerData?.firstName
        ? isDesktop
          ? handleDesktopAccountVerification()
          : push('/account/account-verification')
        : push('/deposit/bank-transfer')
      : isDesktop
      ? openModal('RegisterModal')
      : push('/auth/register/?t=member')
  }

  return (
    <Pressable onPress={handlePress}>
      <Row
        sx={{
          borderRadius: 40,
          bg: '$primary.200',
          p: ['$1', '$1', '$1', '$2'],
        }}
      >
        <View
          sx={{
            borderRadius: 30,
            bg: '$primary.500',
            px: ['$2', '$3'],
            justifyContent: 'center',
            flex: [0.5, 0.5, 0.5, 0.7],
          }}
        >
          <Label
            sx={{
              fontWeight: '900',
              textAlign: 'center',
            }}
          >
            {t('home.banner.n1')}
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
              {t('home.banner.n2')}
            </Label>

            <Row sx={{ flex: 1, alignItems: 'center' }}>
              {animatedText}
              {show && (
                <Icon
                  size={16}
                  name="date"
                  sx={{
                    ml: ['$1', '$2'],
                  }}
                />
              )}
              <Label sx={{ ml: ['$1', '$2'] }}>01-31/10/2023</Label>
            </Row>
          </View>

          <AnimatedButton>{t('home.playNow')}</AnimatedButton>
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

export const AnimatedButton = ({ onPress, children }) => {
  const lang = useAppSelector((state) => state.setting.locale)

  const animatedText = useMemo(
    () => (
      <MotiView
        key={lang}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      >
        <Label
          sx={{
            color: '$error',
            fontWeight: '900',
            lineHeight: 12,
            fontSize: 9,
            textAlign: 'center',
          }}
        >
          {children}
        </Label>
      </MotiView>
    ),
    [lang]
  )

  return (
    <View
      sx={{
        borderRadius: 50,
        overflow: 'hidden',
        alignSelf: 'stretch',
        borderWidth: 2,
        borderColor: '$secondary.500',
        aspectRatio: 1 / 1,
        width: 40,
      }}
    >
      <DripsyGradient
        gradient={'secondary'}
        sx={{ px: ['$1'], flex: 1, justifyContent: 'center' }}
      >
        {animatedText}
      </DripsyGradient>
    </View>
  )
}
