import Icon, { IconComponentProps } from 'agent/components/Icon'
import {
  ActivityIndicator,
  Pressable,
  SxProp,
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
import Text from 'agent/components/Text'

type ActivityIndicatorProps = ComponentProps<typeof ActivityIndicator>
type TextProps = ComponentProps<typeof Text>

interface ButtonProps extends ComponentProps<typeof Pressable> {
  loading?: boolean

  /** Add shadow style to button */
  elevation?: Elevation

  titleProps?: TextProps
  loadingStyle?: StyleProp<ViewStyle>
  loadingProps?: ActivityIndicatorProps
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
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

  const { theme } = useDripsyTheme()

  const accessibilityState = useMemo(
    () => ({
      disabled: Boolean(disabled),
      busy: Boolean(loading),
    }),
    [disabled, loading]
  )

  const defaultPressableSxStyle: SxProp = {
    backgroundColor: theme.colors.$primaryAgent,
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
      backgroundColor: theme.colors.$disabledAgent,
      opacity: 0.4,
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

  const defaultIconProps: IconComponentProps = {
    name: '',
    color: 'white',
    size: theme.space.$6,
  }
  const startIconProps = Object.assign(defaultIconProps, passedStartIconProps)
  const endIconProps = Object.assign(defaultIconProps, passedEndIconProps)

  const defaultTitleSxStyle: SxProp = {
    fontSize: theme.fontSizes.$1,
    textAlign: 'center',
    color: 'white',
  }
  const titleSxStyle = Object.assign(defaultTitleSxStyle, passedTitleSx, {
    ...(disabled && {
      color: theme.colors.$black,
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
              py: theme.space.$2,
              px: theme.space.$10,
            }}
            style={contentStyle}
            {...contentProps}
          >
            {leftIcon && !loading ? (
              <Icon
                sx={{
                  mr: theme.space.$1,
                }}
                style={startIconStyle}
                {...startIconProps}
              />
            ) : null}

            {!loading ? renderTitle(pressableState) : null}

            {rightIcon && !loading ? (
              <Icon
                sx={{
                  ml: theme.space.$1,
                }}
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

Button.displayName = 'AgentButton'

export default Button
