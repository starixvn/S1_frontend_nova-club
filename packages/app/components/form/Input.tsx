import {
  Row,
  SxProp,
  Text,
  TextInput,
  View,
  styled,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
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

type InputComponent = ({ color }: { color?: string }) => React.ReactNode

export interface InputProps extends DripsyTextInputProps {
  label?: string
  subtitle?: string
  prefix?: string
  error?: string
  action?: InputComponent | React.ReactNode
  icon?: string | InputComponent
  sx?: SxProp
  inputSx?: SxProp
  onPress?: (e?: GestureResponderEvent) => void
  children?: ReactNode
  inputContainerSx?: SxProp
  responsive?: boolean
  tabIndex?: number
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
      responsive,
      tabIndex,
      ...rest
    },
    ref
  ) => {
    const InputIcon =
      typeof icon === 'string' ? getDefaultInputIcon(icon) : icon

    const InputAction = action
    const { theme } = useDripsyTheme()

    const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry)
    const inputRef = useRef<NativeTextInput>(null)
    const mergedInputRef = mergeRefs([inputRef, ref])
    const horizontalMode = useResponsiveValue([
      false,
      false,
      false,
      responsive,
      responsive,
    ])

    function handleOnPress(event: GestureResponderEvent) {
      onPress?.(event)
    }

    const sizeEffectColor = error ? ('$secondary.500' as string) : undefined

    return (
      <RootView
        focusable={false}
        sx={{
          cursor: onPress ? 'pointer' : 'initial',
          ...sx,
        }}
      >
        <View
          focusable={false}
          sx={{
            flexGrow: 1,
            flexDirection: horizontalMode ? 'row' : 'column',
            alignItems: horizontalMode ? 'center' : 'stretch',
          }}
        >
          {label && <Label sx={{ flex: 1 }}>{label + ' : '}</Label>}
          <FocusArea focusable={false} onPress={handleOnPress}>
            <InputContainer
              focusable={false}
              editable={editable}
              color={sizeEffectColor}
              sx={{ flexGrow: 1, ...inputContainerSx }}
            >
              {InputIcon && <InputIcon color={sizeEffectColor ?? 'white'} />}
              {prefix && (
                <Container>
                  <Text>{prefix}</Text>
                </Container>
              )}
              <View
                focusable={false}
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
                  cursorColor={theme?.colors?.$primary?.[200]}
                  selectionColor={theme?.colors?.$primary?.[200]}
                  placeholderTextColor="$placeholder"
                  secureTextEntry={_secureTextEntry}
                  sx={{
                    color: sizeEffectColor,
                    minHeight: 30,
                    minWidth: 40,
                    ml: '$2',
                    mr: '$1',
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
                    accessible={false}
                    // @ts-expect-error: react-native-web support this prop but missing in react-native prop
                    focusable={false}
                  >
                    <Icon name={_secureTextEntry ? 'invisible' : 'visible'} />
                  </TouchableOpacity>
                </Container>
              )}
              {InputAction && (
                <Container>
                  {typeof InputAction === 'function' ? (
                    <InputAction color={sizeEffectColor} />
                  ) : (
                    InputAction
                  )}
                </Container>
              )}
            </InputContainer>
          </FocusArea>
        </View>
        <Row>
          {error && (
            <>
              {horizontalMode && <View sx={{ flex: 1 }}></View>}
              <View sx={{ flex: 2 }}>
                <ErrorLabel>{error}</ErrorLabel>
              </View>
            </>
          )}
        </Row>
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

export const Label = styled(Text)({
  fontWeight: 'bold',
  mb: '$1',
})

const Subtitle = styled(Text)({
  mx: '$2',
  color: '$disabled',
})

const InputContainer = styled(Row)(
  ({ color = '$primary.200' }: { color?: string; editable?: boolean }) => {
    return {
      borderColor: color,
      borderRadius: 10,
      py: '$2',
      px: '2%',
      borderWidth: 1,
      alignItems: 'center',
      position: 'relative',
    }
  }
)

const Container = styled(View)({
  mr: '$2',
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
