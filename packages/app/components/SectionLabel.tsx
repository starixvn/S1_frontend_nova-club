import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import Icon from './Icon'
import { MotiView } from 'moti'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Shadow } from 'react-native-shadow-2'

export default function SectionLabel({ icon, iconProps, title, sx }) {
  const { theme } = useDripsyTheme()
  return (
    <Row sx={{ alignItems: 'center', ...sx }}>
      <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={100}>
        <Shadow
          offset={[0, 1]}
          startColor={theme.colors.$primary[100]}
          style={{ borderRadius: 100 }}
          distance={1}
        >
          <IndentIconContainer>
            {/* <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={500}> */}
            <Icon sx={{ fontSize: [10, 12] }} name={icon} {...iconProps} />
            {/* </MotiView> */}
          </IndentIconContainer>
        </Shadow>
      </MotiView>
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
