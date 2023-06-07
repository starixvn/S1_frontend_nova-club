import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import Icon from './Icon'
import { MotiView } from 'moti'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Shadow } from 'react-native-shadow-2'
import ShadowButton from './ShadowButton'

export default function SectionLabel({ icon, iconProps, title, sx }) {
  const { theme } = useDripsyTheme()
  return (
    <Row sx={{ alignItems: 'center', ...sx }}>
      <ShadowButton
        containerStyle={{
          aspectRatio: 1 / 1,
          borderRadius: 24,
          py: '$1',
          px: '$1',
        }}
      >
        <Icon sx={{ fontSize: [10, 12] }} name={icon} {...iconProps} />
      </ShadowButton>
      <Text
        sx={{
          mx: '$2',
          mt: FONT_TOP_OFFSET,
          fontWeight: '700',
          fontSize: [12, 14],
        }}
      >
        {title}
      </Text>
    </Row>
  )
}

const IndentIconContainer = styled(View)({
  width: [20, 25],
  height: [20, 25],
  bg: '$primary.700',
  alignItems: 'center',
  justifyContent: 'center',
  p: ['$1'],
  borderRadius: 100,
})
