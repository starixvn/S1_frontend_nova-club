import Icon, { IconComponentProps } from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { Pressable, styled, SxProp, TextInput, View } from 'dripsy'
import uniqueId from 'lodash/uniqueId'
import { ComponentProps, forwardRef, useMemo, useRef } from 'react'
import {
  GestureResponderEvent,
  TextInput as NativeTextInput,
  Platform,
} from 'react-native'
import { mergeRefs } from 'utils/mergeRefs'
import Label, { InputLabelProps } from './Label'

type TextInputProps = ComponentProps<typeof TextInput>
type ViewProps = ComponentProps<typeof View>
type PressableProps = ComponentProps<typeof Pressable>

export interface InputProps extends TextInputProps {
  _icon?: IconComponentProps | string
  containerProps?: ViewProps
  contentContainerProps?: ViewProps
  error?: string
  isRequired?: boolean
  label?: string
  labelProps?: Omit<InputLabelProps, 'isRequired' | 'nativeId'>
  leftInnerElement?: React.ReactElement | React.ReactElement[]
  leftOuterElement?: React.ReactElement | React.ReactElement[]
  onPress?: (e?: GestureResponderEvent) => void
  rightInnerElement?: React.ReactElement | React.ReactElement[]
  rightOuterElement?: React.ReactElement | React.ReactElement[]
  leftOuterElementProps?: ViewProps
  rightOuterElementProps?: ViewProps
  clickableInputContainerProps?: PressableProps
}

const StyledInputOuterElementContainer = styled(View)(
  (props: { placement?: 'left' | 'right' }) => {
    const placementBasedBorderRadius: Record<
      NonNullable<(typeof props)['placement']>,
      SxProp
    > = {
      left: {
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
      },
      right: {
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
      },
    }
    const borderRadius = placementBasedBorderRadius[props.placement ?? 'left']

    return {
      backgroundColor: '$primaryAgent',
      justifyContent: 'center',
      overflow: 'hidden',
      ...borderRadius,
    }
  }
)

const ClickableInputContainer = styled(Pressable)(
  (props: { editable: InputProps['editable'] }) => {
    return {
      justifyContent: 'center',
      flexGrow: 1,
      py: 12,
      px: 14,
      ...Platform.select({
        web: {
          cursor: props.editable ? 'initial' : 'not-allowed',
        },
      }),
    }
  }
)

/**
 * ### Usage
 * @example
 * ```
 *   <InputBase
 *         leftOuterElement={
 *           <View sx={{ width: 25, height: 25, backgroundColor: 'brown' }} />
 *         }
 *         rightOuterElement={
 *           <View sx={{ width: 25, height: 25, backgroundColor: 'coral' }} />
 *         }
 *         leftInnerElement={
 *           <View
 *             sx={{ width: 25, height: 25, backgroundColor: 'chocolate' }}
 *           />
 *         }
 *         rightInnerElement={
 *           <View sx={{ width: 25, height: 25, backgroundColor: 'cornsilk' }} />
 *         }
 *         editable
 *         isRequired
 *         label={'testing'}
 *         value={'values.username'}
 *         placeholder={'abc1332'}
 *         error={'123s12312313'}
 *     />
 * ```
 */
const Input = forwardRef<NativeTextInput, InputProps>((props, ref) => {
  const {
    containerProps = {},
    contentContainerProps = {},
    editable = true,
    error,
    isRequired = false,
    label,
    labelProps,
    leftInnerElement,
    leftOuterElement,
    nativeID,
    onPress,
    placeholder,
    placeholderTextColor,
    rightInnerElement,
    rightOuterElement,
    leftOuterElementProps,
    rightOuterElementProps,
    sx: inputSx,
    _icon,
    clickableInputContainerProps,
    ...restInputProps
  } = props

  const { sx: containerSx, ...restContainerProps } = containerProps
  const { sx: contentContainerSx, ...restContentContainerProps } =
    contentContainerProps

  const inputNativeId = useMemo(() => {
    return nativeID ?? uniqueId()
  }, [nativeID])

  const inputRef = useRef<NativeTextInput>(null)
  const mergedInputRef = mergeRefs([inputRef, ref])

  function handleOnPress(event: GestureResponderEvent) {
    inputRef.current?.focus()
    onPress?.(event)
  }

  const defaultContainerSxStyle: SxProp = {
    width: '100%',
  }
  const containerSxStyle = Object.assign(defaultContainerSxStyle, containerSx)

  const defaultContentContainerSxStyle: SxProp = {
    backgroundColor: editable ? '$secondaryAgent' : '$disabledAgent',
    borderTopLeftRadius: leftOuterElement ? 0 : 9,
    borderBottomLeftRadius: leftOuterElement ? 0 : 9,
    borderTopRightRadius: rightOuterElement ? 0 : 9,
    borderBottomRightRadius: rightOuterElement ? 0 : 9,
    flex: 1,
  }
  const contentContainerSxStyle = Object.assign(
    defaultContentContainerSxStyle,
    contentContainerSx
  )

  const defaultInputSxStyle: SxProp = {
    fontSize: 16,
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: leftInnerElement ? 8 : 0,
    marginRight: rightInnerElement ? 8 : 0,
    color: '$textAgent',
    ...Platform.select({
      web: {
        cursor: editable ? 'auto' : 'not-allowed',
        minWidth: 0,
      },
    }),
  }
  const inputSxStyle = Object.assign(defaultInputSxStyle, inputSx)

  return (
    <View sx={containerSxStyle} {...restContainerProps}>
      {label ? (
        <Label nativeId={inputNativeId} isRequired={isRequired} {...labelProps}>
          {label + ' '}
        </Label>
      ) : null}

      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'stretch',
        }}
      >
        {leftOuterElement ? (
          <StyledInputOuterElementContainer {...leftOuterElementProps}>
            {leftOuterElement}
          </StyledInputOuterElementContainer>
        ) : null}

        <View sx={contentContainerSxStyle} {...restContentContainerProps}>
          <ClickableInputContainer
            focusable={false}
            disabled={!editable}
            editable={editable}
            onPress={handleOnPress}
            {...clickableInputContainerProps}
          >
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {_icon ? (
                <InputIcon _icon={_icon} />
              ) : leftInnerElement ? (
                leftInnerElement
              ) : null}

              <TextInput
                ref={mergedInputRef}
                underlineColorAndroid={'transparent'}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor ?? '$grayAgent'} // WIP: Remove `dripsy.tsx` common color's `placeholderTextColor` else it won't works
                editable={editable}
                nativeID={inputNativeId}
                sx={inputSxStyle}
                {...Platform.select({
                  web: {
                    disabled: !editable,
                  },
                })}
                {...restInputProps}
              />

              {rightInnerElement ? rightInnerElement : null}
            </View>
          </ClickableInputContainer>
        </View>

        {rightOuterElement ? (
          <StyledInputOuterElementContainer
            placement="right"
            {...rightOuterElementProps}
          >
            {rightOuterElement}
          </StyledInputOuterElementContainer>
        ) : null}
      </View>

      <InputErrorMessage>{error}</InputErrorMessage>
    </View>
  )
})

interface InputErrorMessageProps {
  children: InputProps['error']
}

const InputErrorMessage = (props: InputErrorMessageProps) => {
  const { children } = props

  if (!children) {
    return null
  }

  return (
    <Text
      sx={{
        fontSize: 14,
        color: '$errorAgent',
        marginTop: '$1',
      }}
    >
      {children}
    </Text>
  )
}

interface InputIconProps {
  _icon?: InputProps['_icon']
}

const InputIcon = (props: InputIconProps) => {
  const { _icon } = props

  if (!_icon) {
    return null
  }

  if (typeof _icon === 'string') {
    return <Icon name={_icon} sx={{ color: '$grayAgent' }} size={20} />
  }

  return <Icon sx={{ color: '$grayAgent' }} {..._icon} />
}

Input.displayName = 'AgentInput'
InputErrorMessage.displayName = 'AgentInputErrorMessage'
InputIcon.displayName = 'AgentInputIcon'

export default Input
