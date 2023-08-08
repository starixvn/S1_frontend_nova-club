import {
  ActivityIndicator,
  Pressable,
  SxProp,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import React, { ComponentProps, useMemo } from 'react'
import {
  Platform,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Elevation, shadowGenerator } from 'utils/common'
import Icon, { IconProps } from '../Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'

type ActivityIndicatorProps = ComponentProps<typeof ActivityIndicator>
type TextProps = ComponentProps<typeof Text>

export interface ButtonProps extends ComponentProps<typeof Pressable> {
  loading?: boolean

  /** Add shadow style to button */
  elevation?: Elevation

  titleProps?: TextProps
  loadingStyle?: StyleProp<ViewStyle>
  loadingProps?: ActivityIndicatorProps
  leftIcon?: IconProps
  rightIcon?: IconProps
  contentStyle?: StyleProp<ViewStyle>
  contentProps?: ComponentProps<typeof View>
}

const BORDER_RADIUS = 9

/**
 * ### Usage
 * @example
 *
 * ```ts
 *       <Button
 *         elevation={1}
 *         leftIcon={{
 *           name: 'lock',
 *         }}
 *         titleStyle={{
 *           fontWeight: 'bold',
 *           color: 'blue',
 *         }}
 *         onPress={() => {}}
 *      >
 *        Hello world
 *      </Button>
 *```
 */
const Button = (props: ButtonProps) => {
  const {
    elevation = 1,
    disabled,
    style,
    loading = false,
    children,
    titleProps,
    loadingStyle,
    loadingProps: passedLoadingProps,
    leftIcon,
    rightIcon,
    contentStyle,
    contentProps,
    sx,
    ...rest
  } = props

  const { style: startIconStyle, ...passedStartIconProps } = leftIcon || {}
  const { style: endIconStyle, ...passedEndIconProps } = rightIcon || {}
  const { sx: passedTitleSx, ...passedTitleProps } = titleProps || {}

  const accessibilityState = useMemo(
    () => ({
      disabled: Boolean(disabled),
      busy: Boolean(loading),
    }),
    [disabled, loading]
  )

  const defaultPressableSxStyle: SxProp = {
    backgroundColor: '$secondary.500',
    borderRadius: BORDER_RADIUS,
    ...(elevation && shadowGenerator(elevation)),
    ...Platform.select({
      web: {
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      },
    }),
  }
  const pressableSxStyle = Object.assign(defaultPressableSxStyle, sx, {
    ...(disabled && {
      backgroundColor: '$disabled',
      opacity: 0.6,
    }),
  })

  const defaultLoadingProps: ActivityIndicatorProps = {
    color: 'white',
    size: 'small',
  }
  const loadingProps: ActivityIndicatorProps = Object.assign(
    defaultLoadingProps,
    passedLoadingProps
  )

  const defaultIconProps: IconProps = {
    name: '',
    color: 'white',
  }
  const startIconProps = Object.assign(defaultIconProps, passedStartIconProps)
  const endIconProps = Object.assign(defaultIconProps, passedEndIconProps)

  const defaultTitleSxStyle: SxProp = {
    fontSize: [13, 13, 13, 15],
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    mt: FONT_TOP_OFFSET,
  }

  const titleSxStyle = Object.assign(defaultTitleSxStyle, passedTitleSx, {
    ...(disabled && {
      color: 'white',
    }),
  })

  const renderTitle = (pressableState: PressableStateCallbackType) => {
    if (typeof children === 'string' || typeof children === 'object') {
      return (
        <Text sx={titleSxStyle} {...passedTitleProps}>
          {children}
        </Text>
      )
    }

    if (typeof children === 'function') {
      return children(pressableState)
    }

    return children
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      disabled={disabled || loading}
      sx={pressableSxStyle}
      style={(pressableState) => [
        typeof style === 'function' ? style(pressableState) : style,
        {
          opacity: pressableState.pressed ? 0.7 : disabled || loading ? 0.5 : 1,
        },
      ]}
      {...rest}
    >
      {(pressableState) => {
        return (
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              py: 10,
              px: '$3',
            }}
            style={contentStyle}
            {...contentProps}
          >
            {leftIcon && !loading ? (
              <Icon
                sx={{
                  mr: '$2',
                }}
                style={startIconStyle}
                {...startIconProps}
              />
            ) : null}

            {!loading ? renderTitle(pressableState) : null}

            {rightIcon && !loading ? (
              <Icon
                sx={{
                  ml: '$2',
                }}
                size={12}
                style={startIconStyle}
                {...endIconProps}
              />
            ) : null}

            {loading && (
              <ActivityIndicator style={[loadingStyle]} {...loadingProps} />
            )}
          </View>
        )
      }}
    </Pressable>
  )
}

Button.displayName = 'Button'

export default Button
