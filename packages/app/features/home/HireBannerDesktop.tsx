import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { JoinNowBtn } from './HireBanner'

export default function HireBannerDesktop() {
  const { t } = useLocalization()
  // const direction = useResponsiveValue(['column', 'column', 'column', 'row'])
  const showTime = useResponsiveValue([false, true])

  return (
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
        }}
      >
        <Label
          sx={{
            fontWeight: '900',
          }}
        >
          {t('home.hireAgent')}
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
            {t('home.banner2.n1')}
          </Label>
          <Label sx={{ flex: 1 }}>{t('home.banner2.n2')}</Label>
        </View>

        <JoinNowBtn>{t('home.joinNow')}</JoinNowBtn>
      </Row>
    </Row>
  )
}

const Label = styled(Text)({
  mt: FONT_TOP_OFFSET,
  fontSize: [11, 12, 12, 11, 12],
  lineHeight: [13, 15, 15, 13, 15],
  fontWeight: 'bold',
})
