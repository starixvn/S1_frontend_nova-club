import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Row, SxProp, Text } from 'dripsy'
import React, { ComponentProps } from 'react'
import { ViewProps } from 'react-native'
import Icon, { IconProps } from './Icon'
import ShadowButton from './ShadowButton'

interface SectionLabelProps extends ViewProps {
  sx?: SxProp
  icon: string
  title: string
  iconProps?: Omit<IconProps, 'name'>
  titleProps?: ComponentProps<typeof Text>
}

export default function SectionLabel({
  icon,
  iconProps,
  title,
  titleProps,
  sx,
  children,
}: SectionLabelProps) {
  return (
    <Row sx={{ alignItems: 'center', ...sx }}>
      <ShadowButton
        containerStyle={{
          width: 30,
          height: 30,
          aspectRatio: 1 / 1,
          borderRadius: 24,
        }}
      >
        <Icon size={14} name={icon} {...iconProps} />
      </ShadowButton>
      <Text
        {...titleProps}
        sx={{
          mx: '$2',
          mt: FONT_TOP_OFFSET,
          fontWeight: '700',
          fontSize: [12, 14],
          ...titleProps?.sx,
        }}
      >
        {title}
      </Text>
      {children}
    </Row>
  )
}
