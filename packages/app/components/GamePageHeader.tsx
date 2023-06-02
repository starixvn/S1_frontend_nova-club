import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import Icon from './Icon'
import { MotiView } from 'moti'
import { FONT_TOP_OFFSET } from 'app/constants/font'

export default function GamePageHeader({ icon, title }) {
  return (
    <Row
      sx={{
        bg: '$primary.300',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        py: '$1',
        px: ['$2', '$3'],
        alignItems: 'center',
        marginRight: 'auto',
        my: ['$2', '$3'],
      }}
    >
      <IndentIconContainer
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        delay={100}
      >
        <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={500}>
          <Icon sx={{ fontSize: [20, 22, 24] }} name={icon} />
        </MotiView>
      </IndentIconContainer>
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

const IndentIconContainer = styled(MotiView)({
  bg: '$primary.700',
  p: ['$1', '$2'],
  ml: ['$2', '$3'],
  borderRadius: 100,
})
