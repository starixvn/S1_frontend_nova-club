import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import Icon from './Icon'

import { Shadow } from 'react-native-shadow-2'
import ShadowButton from './ShadowButton'

export default function GamePageHeader({ icon, title }) {
  const { theme } = useDripsyTheme()
  return (
    <Row
      sx={{
        bg: '$primary.300',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        py: '$1',
        pr: ['$2', '$3'],
        pl: ['$3', '$4'],
        alignItems: 'center',
        marginRight: 'auto',
        my: ['$2', '$3'],
      }}
    >
      <ShadowButton
        containerStyle={{ aspectRatio: 1 / 1, borderRadius: 24, p: '$2' }}
      >
        <Icon name={icon} sx={{ fontSize: [18, 20, 22] }} />
      </ShadowButton>

      <Text
        sx={{
          mx: '$2',
          mt: FONT_TOP_OFFSET,
          fontWeight: '700',
          fontSize: [16, 22],
        }}
      >
        {title}
      </Text>
    </Row>
  )
}

const IndentIconContainer = styled(View)({
  bg: '$primary.700',
  p: [6, '$2'],
  borderRadius: 100,
})
