import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Row, SxProp, Text } from 'dripsy'
import React from 'react'
import { ViewProps } from 'react-native'
import Icon, { IconProps } from './Icon'
import ShadowButton from './ShadowButton'

interface SectionLabelProps extends ViewProps {
  sx?: SxProp
  icon: string
  title: string
  iconProps?: IconProps
}

export default function SectionLabel({
  icon,
  iconProps,
  title,
  sx,
  children,
}: SectionLabelProps) {
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
      {children}
    </Row>
  )
}
