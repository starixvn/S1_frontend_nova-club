import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Pressable, styled, Text, View } from 'dripsy'
import uniqueId from 'lodash/uniqueId'
import { MotiView } from 'moti'
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useReducer,
} from 'react'
import { FlatListProps } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import ActionSheet, { ActionSheetProps } from '../actionsheet/ActionSheet'
import Input, { InputProps } from '../form/Input'
import Icon from '../Icon'
import Label, { InputLabelProps } from '../Label'

const StyledPressable = styled(Pressable)({
  borderRadius: 9,
  backgroundColor: '$secondary',
})

const StyledContentContainer = styled(View)(
  (props: { safeAreaBottom: number }) => {
    return {
      pb: props.safeAreaBottom,
      bg: '$primary.500',
    }
  }
)

type ViewProps = ComponentProps<typeof View>

export type Options<T> = {
  icon?: string
  label: string
  value: T
  id?: string
}

export type SelectProps<T> = {
  _actionSheet?: Partial<ActionSheetProps>
  isHorizontalActionSheet?: boolean
  isRequired?: boolean
  label?: InputLabelProps['children']
  labelProps?: Omit<InputLabelProps, 'isRequired'>
  loading?: boolean
  onSelected: (value: T) => void
  onOpen?: () => void
  selectTriggerProps?: ComponentProps<typeof Pressable>
  contentContainerProps?: ViewProps
  options: Options<T>[]
  placeholder: InputProps['placeholder']
  value: T
  _input?: Omit<
    InputProps,
    | 'placeholder'
    | 'importantForAccessibility'
    | 'placeholder'
    | 'value'
    | 'editable'
    | 'pointerEvents'
    | 'clickableInputContainerProps'
  >
  _actionSheetFlatlist?: Omit<FlatListProps<Options<T>>, 'data'>
  _actionSheetContent?: (args: {
    closeActionSheet: () => void
  }) => React.ReactNode
} & ViewProps

interface CommonHeaderProps {
  label?: InputLabelProps['children']
}

export const CommonHeader = (props: CommonHeaderProps) => {
  const { label } = props

  return (
    <View
      sx={{
        minHeight: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '$primary.100',
      }}
    >
      <View
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            fontWeight: '500',
            fontSize: 18,
            color: 'white',
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  )
}

/**
 * @example
 *    <Select
 *      options={[
 *        { label: 'Commisiion', value: 123 },
 *        { label: 'Profit', value: 124 },
 *        { label: 'Average profit', value: 125 },
 *        { label: 'FAFB', value: 126 },
 *      ]}
 *      placeholder="123123"
 *      value={selectValue}
 *      onSelected={(val) => {
 *        setSelectValue(val)
 *      }}
 *      label="Reset RT %"
 *      isRequired
 *    />
 */
export interface CloseSelectForwardRef {
  closeActionSheet: () => void
}

const Select = <T,>(
  props: SelectProps<T>,
  ref: ForwardedRef<CloseSelectForwardRef>
) => {
  const {
    options,
    loading,
    isHorizontalActionSheet = false,
    onSelected,
    _actionSheet,
    label,
    labelProps,
    isRequired,
    placeholder,
    value,
    _input,
    _actionSheetFlatlist,
    _actionSheetContent,
    onOpen,
    selectTriggerProps,
    contentContainerProps,
    ...rest
  } = props

  const { sheetId: passedSheetId, ...actionSheetProp } = _actionSheet || {}
  const { bottom } = useSafeArea()
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false)

  const sheetId = useMemo(() => {
    return passedSheetId ?? uniqueId()
  }, [passedSheetId])

  const selectedItem = options.find((option) => {
    return option.value === value
  })

  function openActionSheet() {
    SheetManager.show(sheetId)
    toggleIsOpen()
  }

  function closeActionSheet() {
    SheetManager.hide(sheetId)
  }
  useImperativeHandle(ref, () => ({
    closeActionSheet,
  }))

  const memoArrow = useMemo(
    () => (
      <MotiView
        from={{
          rotate: '0deg',
        }}
        animate={{
          rotate: isOpen ? '180deg' : '0deg',
        }}
        transition={{
          type: 'timing',
        }}
      >
        <Icon name="down" color="white" />
      </MotiView>
    ),
    [isOpen]
  )

  return (
    <View {...rest}>
      {label ? (
        <Label isRequired={isRequired} {...labelProps}>
          {label}
        </Label>
      ) : null}

      <StyledPressable
        onPress={() => {
          openActionSheet()
          onOpen?.()
        }}
        disabled={loading}
        accessibilityRole="button"
        {...selectTriggerProps}
      >
        <View pointerEvents="none">
          <Input
            placeholder={placeholder}
            pointerEvents="none"
            value={selectedItem ? selectedItem.label : (value as string)}
            action={() => memoArrow}
          />
        </View>
      </StyledPressable>

      <ActionSheet
        key={sheetId}
        sheetId={sheetId}
        CustomHeaderComponent={
          label ? <CommonHeader label={label} /> : undefined
        }
        onClose={toggleIsOpen}
        {...actionSheetProp}
      >
        <StyledContentContainer
          safeAreaBottom={bottom}
          {...contentContainerProps}
        >
          {_actionSheetContent
            ? _actionSheetContent({ closeActionSheet })
            : options.map((item, index) => {
                const isSelected = item.value === value

                return (
                  <Pressable
                    key={`index ${item.value}`}
                    sx={{
                      backgroundColor: isSelected
                        ? '$primary.300'
                        : '$primary.500',
                      py: 16,
                      px: 16,
                      borderTopWidth: index === 0 ? 2 : 0,
                      borderBottomWidth: 2,
                      borderColor: '$primary.100',
                    }}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                    onPress={() => {
                      onSelected(item.value)
                      closeActionSheet()
                    }}
                  >
                    <Text
                      sx={{
                        color: 'white',
                        fontWeight: '500',
                      }}
                    >
                      {item?.label}
                    </Text>
                  </Pressable>
                )
              })}
        </StyledContentContainer>
      </ActionSheet>
    </View>
  )
}

Select.displayName = 'Select'

export default forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<CloseSelectForwardRef> }
) => ReturnType<typeof Select>
