import { Button } from 'app/components/form/Button'
import { SxProp, useDripsyTheme, View } from 'dripsy'
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

type ButtonPropsType = ComponentProps<typeof Button>

type FabProps = ComponentProps<typeof View> & {
  placement?: PlacementType
  iconProp?: Partial<ComponentProps<typeof Icon>>
  children?: React.ReactNode
  buttonProps?: Partial<ButtonPropsType>
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
  const { theme } = useDripsyTheme()

  const { containerStyle = {}, ...restButtonProps } = buttonProps || {}

  const mergedSx: SxProp = {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    maxWidth: 'container',
    borderRadius: 50,
    shadowColor: theme.colors.$secondary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    ...placementProps[placement || 'bottom-left'],
    ...(sx || {}),
  }

  const mergedButtonContainerStyle: ButtonPropsType['containerStyle'] = {
    ...{
      px: 12,
      height: 50,
      width: 50,
      overflow: 'hidden',
    },
    ...containerStyle,
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
        containerStyle={mergedButtonContainerStyle}
        {...restButtonProps}
      >
        {children ?? <Icon name="cross" size={25} {...iconProp} />}
      </Button>
    </View>
  )
}

export default Fab
