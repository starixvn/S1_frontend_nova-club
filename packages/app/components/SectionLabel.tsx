import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import Icon from './Icon'
import { MotiView } from 'moti'
import { FONT_TOP_OFFSET } from 'app/constants/font'

export default function SectionLabel({ icon, iconProps, title, sx }) {
  return (
    <Row sx={{ alignItems: 'center', ...sx }}>
      <IndentIconContainer
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        delay={100}
      >
        <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={500}>
          <Icon sx={{ fontSize: [10, 12] }} name={icon} {...iconProps} />
        </MotiView>
      </IndentIconContainer>
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

const IndentIconContainer = styled(MotiView)({
  width: [20, 25],
  height: [20, 25],
  bg: '$primary.700',
  alignItems: 'center',
  justifyContent: 'center',
  p: ['$1'],
  borderRadius: 100,
})
