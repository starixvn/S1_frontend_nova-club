/* eslint-disable react/display-name */
import GradientBox from 'app/components/GradientBox'
import { TextInput, SxProp, Text, View } from 'dripsy'
import { motify, useAnimationState } from 'moti'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import {
  TouchableWithoutFeedback,
  TextInputProps,
  StyleSheet,
  ViewProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
} from 'react-native'

const MotiText = motify(Text)()
export const INPUT_BASE_SPACE = 16

export interface InputBaseProps extends TextInputProps {
  label?: string
  error?: string
  sx?: SxProp
  action?: React.ReactNode
  containerProps?: ViewProps
  inputStyle?: SxProp
  removeBorder?: boolean
  onPress?: (e?: any) => void
}

const InputBase = forwardRef<{}, InputBaseProps>(
  (
    {
      label,
      placeholder,
      value,
      sx = {},
      error,
      action,
      editable = true,
      containerProps,
      inputStyle,
      removeBorder,
      onBlur,
      onFocus,
      children,
      onPress,
      ...rest
    },
    ref
  ) => {
    const isEmpty = !(value || placeholder)
    const inputRef = useRef<typeof TextInput>(null)
    const labelState = useAnimationState({
      from: {
        fontSize: 18,
        top: 20,
      },
      default: {
        fontSize: 18,
        top: 20,
      },
      shrink: {
        top: 8,
        fontSize: 14,
      },
    })

    function _onFocus() {
      labelState.transitionTo('shrink')
    }

    function _onBlur() {
      if (isEmpty) {
        labelState.transitionTo('default')
      } else labelState.transitionTo('shrink')
    }

    useImperativeHandle(ref, () => {
      return {
        focus: () => inputRef.current?.focus(),
      }
    })

    useEffect(() => {
      if (!inputRef.current?.isFocused()) {
        _onBlur()
      } else if (!isEmpty) {
        labelState.transitionTo('shrink')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, placeholder])

    function defaultFocus() {
      inputRef.current?.focus()
    }

    const gradientBoxStyle: SxProp = {}
    if (removeBorder) {
      gradientBoxStyle.borderTopWidth = 0
      gradientBoxStyle.borderBottomWidth = 0
    }
    if (error) gradientBoxStyle.borderColor = '$error'

    return (
      <View sx={{ mb: '$2', ...sx }} {...containerProps}>
        <View sx={{ flexDirection: 'row', height: 60 }}>
          <GradientBox
            containerStyle={gradientBoxStyle}
            colors={
              editable ? undefined : ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']
            }
            sx={{
              ...StyleSheet.absoluteFillObject,
              opacity: editable ? 1 : 0.5,
            }}
          />
          <TouchableWithoutFeedback
            disabled={!editable}
            onPress={onPress ?? defaultFocus}
          >
            <View
              sx={{
                flex: 1,
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                px: INPUT_BASE_SPACE,
                cursor: onPress && Platform.OS === 'web' ? 'pointer' : 'auto',
              }}
            >
              <MotiText
                transition={{ type: 'timing', duration: 300 }}
                state={labelState}
                sx={{
                  position: 'absolute',
                  left: INPUT_BASE_SPACE,
                  color: error ? '$error' : '#999999',
                  lineHeight: 20,
                  right: 40,
                }}
                numberOfLines={1}
              >
                {label}
              </MotiText>
              <View
                pointerEvents={onPress ? 'none' : undefined}
                sx={{
                  flex: 1,
                  py: '$2a',
                  alignSelf: 'flex-end',
                }}
              >
                <TextInput
                  ref={inputRef}
                  onFocus={(e) => {
                    _onFocus()
                    onFocus && onFocus(e)
                  }}
                  onBlur={(e) => {
                    _onBlur()
                    onBlur && onBlur(e)
                  }}
                  placeholder={placeholder}
                  style={{ fontSize: 16, marginTop: 'auto' }}
                  editable={editable && !onPress}
                  sx={inputStyle}
                  value={value}
                  {...rest}
                />
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
          {action && (
            <View
              sx={{
                justifyContent: 'center',
              }}
            >
              {action}
            </View>
          )}
        </View>
        {error && (
          <Text
            sx={{
              fontSize: 14,
              mx: INPUT_BASE_SPACE,
              color: '$error',
            }}
          >
            {error}
          </Text>
        )}
      </View>
    )
  }
)

export default InputBase
