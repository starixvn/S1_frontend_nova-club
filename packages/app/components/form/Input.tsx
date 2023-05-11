import { Row, SxProp, Text, TextInput, View, styled } from 'dripsy'
import React, { ReactNode, forwardRef, useRef, useState } from 'react'
import {
  TouchableWithoutFeedback,
  TextInput as NativeTextInput,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native'
import Icon from '../Icon'
import { mergeRefs } from 'utils/mergeRefs'
import { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput'

export interface InputProps extends DripsyTextInputProps {
  label?: string
  prefix?: string
  action?: ReactNode
  icon?: string | ReactNode
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
    const IconContainer = !icon ? null : typeof icon === 'string' ? (
      <Container>
        <Icon name={icon} size={25} />
      </Container>
    ) : (
      icon
    )

    const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry)
    const inputRef = useRef<NativeTextInput>(null)
    const mergedInputRef = mergeRefs([inputRef, ref])

    function handleOnPress(event: GestureResponderEvent) {
      onPress?.(event)
    }

    return (
      <RootView sx={{ cursor: onPress ? 'pointer' : 'initial', ...sx }}>
        {label && <Label>{`${label} :`}</Label>}
        <FocusArea onPress={handleOnPress}>
          <InputContainer>
            {IconContainer}
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
            {action && <Container>{action}</Container>}
          </InputContainer>
        </FocusArea>
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

const InputContainer = styled(Row)({
  borderColor: '$primary.200',
  borderRadius: 10,
  py: '$2',
  px: '2%',
  borderWidth: 1,
  alignItems: 'center',
  position: 'relative',
})

const Container = styled(View)({
  mx: '$2',
})

export default Input
