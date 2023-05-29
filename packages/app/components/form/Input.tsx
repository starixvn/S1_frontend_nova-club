import { Row, SxProp, Text, TextInput, View, styled } from 'dripsy'
import { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput'
import React, { ReactNode, forwardRef, useRef, useState } from 'react'
import {
  GestureResponderEvent,
  TextInput as NativeTextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { mergeRefs } from 'utils/mergeRefs'
import Icon from '../Icon'

type InputComponent = ({ color }: { color?: string }) => JSX.Element

export interface InputProps extends DripsyTextInputProps {
  label?: string
  prefix?: string
  error?: string
  action?: InputComponent
  icon?: string | InputComponent
  sx?: SxProp
  inputSx?: SxProp
  onPress?: (e?: GestureResponderEvent) => void
  children?: ReactNode
}

const Input = forwardRef<NativeTextInput, InputProps>(
  (
    {
      label,
      prefix,
      error,
      action,
      icon,
      sx,
      inputSx,
      editable = true,
      secureTextEntry,
      onPress,
      children,
      ...rest
    },
    ref
  ) => {
    const InputIcon =
      typeof icon === 'string' ? getDefaultInputIcon(icon) : icon

    const InputAction = action

    const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry)
    const inputRef = useRef<NativeTextInput>(null)
    const mergedInputRef = mergeRefs([inputRef, ref])

    function handleOnPress(event: GestureResponderEvent) {
      onPress?.(event)
    }

    const sizeEffectColor = error ? ('$secondary.500' as string) : undefined

    return (
      <RootView sx={{ cursor: onPress ? 'pointer' : 'initial', ...sx }}>
        {label && <Label>{`${label} :`}</Label>}
        <FocusArea onPress={handleOnPress}>
          <InputContainer
            color={sizeEffectColor}
            sx={editable ? {} : { bg: '$primary.300' }}
          >
            {InputIcon && <InputIcon color={sizeEffectColor ?? 'white'} />}
            {prefix && (
              <Container>
                <Text>{prefix}</Text>
              </Container>
            )}
            <View
              pointerEvents={onPress ? 'none' : undefined}
              sx={{
                flex: 1,
              }}
            >
              <TextInput
                ref={mergedInputRef}
                editable={editable && !onPress}
                placeholderTextColor="$placeholder"
                secureTextEntry={_secureTextEntry}
                sx={{
                  color: sizeEffectColor,
                  minHeight: 30,
                  minWidth: 40,
                  mx: '$2',
                  ...inputSx,
                }}
                {...rest}
              />
            </View>
            {children}
            {secureTextEntry && (
              <Container>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!_secureTextEntry)}
                >
                  <Icon name={_secureTextEntry ? 'invisible' : 'visible'} />
                </TouchableOpacity>
              </Container>
            )}
            {InputAction && (
              <Container>
                <InputAction color={sizeEffectColor} />
              </Container>
            )}
          </InputContainer>
        </FocusArea>
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </RootView>
    )
  }
)

Input.displayName = 'Input'

const RootView = styled(View)({
  mb: '$3',
  maxWidth: 450,
})

const FocusArea = styled(TouchableWithoutFeedback)({})

const Label = styled(Text)({
  fontWeight: 'bold',
  mb: '$1',
})

const InputContainer = styled(Row)(
  ({ color = '$primary.200' }: { color?: string }) => ({
    borderColor: color,
    borderRadius: 10,
    py: '$2',
    px: '2%',
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  })
)

const Container = styled(View)({
  mx: '$2',
})

const getDefaultInputIcon = (name: string) => {
  const comp = ({ color }) => {
    return (
      <Container>
        <Icon name={name} size={22} color={color} />
      </Container>
    )
  }
  return comp
}

const ErrorLabel = styled(Text)({
  color: '$secondary.500',
  fontSize: 14,
  mx: '2%',
  px: '$2',
  mt: '$1',
})

export default Input
