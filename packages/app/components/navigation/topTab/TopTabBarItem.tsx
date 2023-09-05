import ShadowButton from 'app/components/ShadowButton'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Pressable, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

type Props = {
  isActive: boolean
  label: string
  labelProps?: Omit<ComponentProps<typeof TopTabBarItemLabel>, 'isActive'>
} & ComponentProps<typeof Pressable>

export default function TopTabBarItem({
  isActive,
  label,
  labelProps,
  ...rest
}: Props) {
  return (
    <TopTabBarItemPressable {...rest}>
      <ShadowButton isActive={isActive} safeRender stretch>
        <TopTabBarItemLabel
          numberOfLines={2}
          isActive={isActive}
          {...labelProps}
        >
          {label}
        </TopTabBarItemLabel>
      </ShadowButton>
    </TopTabBarItemPressable>
  )
}

const TopTabBarItemPressable = styled(Pressable)({
  maxWidth: 170,
  flex: 1,
  py: '$3',
})

const TopTabBarItemLabel = styled(Text)(
  ({ isActive }: { isActive: boolean }) => ({
    mt: FONT_TOP_OFFSET,
    fontWeight: '900',
    color: 'white',
    opacity: isActive ? 1 : 0.5,
    textAlign: 'center',
    px: '$2',
    py: ['$1', 0],
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: 18,
  })
)
