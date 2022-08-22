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
} from 'react-native'

const MotiText = motify(Text)()

export interface InputBaseProps extends TextInputProps {
  label: string
  error?: string
  sx?: SxProp
  action?: React.ReactNode
  containerProps?: ViewProps
  inputStyle?: SxProp
  removeBorder?: boolean
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
      ...rest
    },
    ref
  ) => {
    const isEmpty = !(value || placeholder)
    const space = '$4'
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

    return (
      <TouchableWithoutFeedback
        disabled={!editable}
        onPress={() => {
          inputRef.current?.focus()
        }}
      >
        <View sx={{ mb: '$2', ...sx }} {...containerProps}>
          <View
            sx={{
              flexDirection: 'row',
              height: 60,
              py: '$3',
              px: space,
              position: 'relative',
            }}
          >
            <GradientBox
              removeBorder={removeBorder}
              colors={
                editable ? undefined : ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']
              }
              sx={{
                ...StyleSheet.absoluteFillObject,
                opacity: editable ? 1 : 0.5,
              }}
            />
            <MotiText
              pointerEvents="none"
              transition={{ type: 'timing', duration: 300 }}
              state={labelState}
              sx={{
                position: 'absolute',
                left: space,
                color: '#999999',
                lineHeight: 20,
              }}
            >
              {label}
            </MotiText>
            <View
              sx={{
                flex: 1,
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
                editable={editable}
                sx={inputStyle}
                value={value}
                {...rest}
              />
            </View>
            {action && (
              <View sx={{ ml: space, justifyContent: 'center' }}>{action}</View>
            )}
          </View>
          {error && (
            <Text sx={{ fontSize: 14, ml: space, color: '$error' }}>
              {error}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

export default InputBase
