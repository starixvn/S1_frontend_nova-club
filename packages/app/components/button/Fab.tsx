import { Button } from 'app/components/form/Button'
import { SxProp, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import Icon from 'app/components/Icon'
import { Platform } from 'react-native'

type PlacementType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

const placementProps: Record<PlacementType, SxProp> = {
  'top-right': { top: 4, right: 4 },
  'top-left': { top: 4, left: 4 },
  'bottom-right': { bottom: 4, right: 4 },
  'bottom-left': { bottom: 4, left: 4 },
}

type FabProps = ComponentProps<typeof View> & {
  placement?: PlacementType
  iconProp?: Partial<ComponentProps<typeof Icon>>
  children?: React.ReactNode
  buttonProps?: Partial<ComponentProps<typeof Button>>
}

/**
 *
 * @example
 * <Fab
      buttonProps={{
        fill: {
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
      }}
      placement="top-left"
      iconProp={{
        size: 50,
      }}
    />
 */
const Fab = ({
  children,
  placement,
  sx,
  iconProp,
  buttonProps,
  ...fabProps
}: FabProps) => {
  const mergedSx: SxProp = {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    maxWidth: 'container',
    ...placementProps[placement || 'bottom-left'],
    ...(sx || {}),
  }

  return (
    <View sx={mergedSx} {...fabProps}>
      <Button
        rounded
        variant="lg"
        fill={{
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        containerStyle={{
          px: 12,
          height: 50,
          width: 50,
        }}
        {...buttonProps}
      >
        {children ?? <Icon name="cross" size={25} {...iconProp} />}
      </Button>
    </View>
  )
}

export default Fab
