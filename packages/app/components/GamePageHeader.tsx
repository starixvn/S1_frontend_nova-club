import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Row, Text } from 'dripsy'
import React from 'react'
import Icon from './Icon'

import useLocalization from 'app/provider/localization'
import ShadowButton from './ShadowButton'

export default function GamePageHeader({ icon, title }) {
  const { t } = useLocalization()

  return (
    <Row
      sx={{
        bg: '$primary.300',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        py: ['$1', '$2'],
        pr: ['$2', '$3'],
        pl: ['$3', '$4'],
        alignItems: 'center',
        marginRight: 'auto',
      }}
    >
      <ShadowButton
        containerStyle={{
          aspectRatio: 1 / 1,
          borderRadius: 24,
          px: ['$1', 6],
          py: ['$1', 6],
        }}
      >
        <Icon name={icon} sx={{ fontSize: [14, 18] }} />
      </ShadowButton>

      <Text
        sx={{
          mx: '$2',
          mt: FONT_TOP_OFFSET,
          fontWeight: '700',
          fontSize: [14, 18],
        }}
      >
        {t(title)}
      </Text>
    </Row>
  )
}
