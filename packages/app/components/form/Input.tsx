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
import isDesktop from 'app/utils/isDesktop'
import InputLabel from './InputLabel'

type InputComponent = ({ color }: { color?: string }) => JSX.Element

export interface InputProps extends DripsyTextInputProps {
  label?: string
  subtitle?: string
  prefix?: string
  error?: string
  action?: InputComponent
  icon?: string | InputComponent
  sx?: SxProp
  inputSx?: SxProp
  onPress?: (e?: GestureResponderEvent) => void
  children?: ReactNode
  inputContainerSx?: SxProp
  isHorizontalLabel?: boolean
}

const Input = forwardRef<NativeTextInput, InputProps>(
  (
    {
      label,
      subtitle,
      prefix,
      error,
      action,
      icon,
      sx,
      inputSx,
      inputContainerSx,
      editable = true,
      secureTextEntry,
      onPress,
      children,
      isHorizontalLabel = false,
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
    // const desktop = isDesktop()

    function handleOnPress(event: GestureResponderEvent) {
      onPress?.(event)
    }

    const sizeEffectColor = error ? ('$secondary.500' as string) : undefined

    return (
      <RootView
        // isDesktop={desktop}
        sx={{
          cursor: onPress ? 'pointer' : 'initial',
          ...sx,
          ...(isHorizontalLabel
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-evenly',
              }
            : {}),
        }}
      >
        {label && <InputLabel label={label} desktop={isHorizontalLabel} />}
        <View sx={{ width: '100%' }}>
          <FocusArea onPress={handleOnPress}>
            <InputContainer
              isDesktop={isHorizontalLabel}
              editable={editable}
              color={sizeEffectColor}
              sx={inputContainerSx}
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
                {subtitle && (
                  <Subtitle numberOfLines={1}>{`${subtitle}`}</Subtitle>
                )}
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
                    fontSize: 14,
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
        </View>
      </RootView>
    )
  }
)

Input.displayName = 'Input'

const RootView = styled(View)({
  mb: '$3',
  // maxWidth: 450,
})

const FocusArea = styled(TouchableWithoutFeedback)({})

const Label = styled(Text)({
  fontWeight: 'bold',
  mb: '$1',
})

const Subtitle = styled(Text)({
  mx: '$2',
  color: '$disabled',
})

const InputContainer = styled(Row)(
  ({
    color = '$primary.200',
    isDesktop = false,
    editable,
  }: {
    color?: string
    isDesktop?: boolean
    editable?: boolean
  }) => {
    const desktopStyled = {
      width: '60%',
      minWidth: 200,
    }
    const editableStyled = {
      bg: '$primary.300',
    }
    return {
      borderColor: color,
      borderRadius: 10,
      py: '$2',
      px: '2%',
      borderWidth: 1,
      alignItems: 'center',
      position: 'relative',
      ...(!editable && editableStyled),
      ...(isDesktop && desktopStyled),
    }
  }
)

const Container = styled(View)({
  mx: '$2',
})

const getDefaultInputIcon = (name: string) => {
  const comp = ({ color }) => {
    return (
      <View sx={{ ml: '$2', pr: '$1' }}>
        <Icon name={name} size={18} color={color} />
      </View>
    )
  }
  return comp
}

export const ErrorLabel = styled(Text)({
  color: '$secondary.500',
  fontSize: 14,
  mx: '2%',
  px: '$2',
  mt: '$1',
})

export default Input
