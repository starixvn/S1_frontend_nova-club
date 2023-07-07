import { SxProp, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import SectionLabel from './SectionLabel'
import { ViewProps } from 'react-native'
import Shadow from './Shadow'

interface SectionHeaderProps extends ViewProps {
  sx?: SxProp
  icon: string
  title: string
}

export default function SectionHeader({
  icon,
  title,
  sx,
  ...rest
}: SectionHeaderProps) {
  const { theme } = useDripsyTheme()

  return (
    <Root sx={sx}>
      <Shadow
        safeRender
        offset={[0, -1]}
        distance={1}
        stretch
        startColor={theme.colors.$primary[100]}
        style={{
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <View
          sx={{
            bg: '$primary.300',
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            p: [6, '$2'],
          }}
          {...rest}
        >
          <SectionLabel icon={icon} title={title} />
        </View>
      </Shadow>
    </Root>
  )
}
const Root = styled(View)({
  ml: ['$pagePadding', '$pagePadding', '$pagePadding', 0],
})
