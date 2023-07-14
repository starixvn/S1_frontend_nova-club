import Text from 'agent/components/Text'

import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Pressable, styled, View } from 'dripsy'
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
import { FlatList, FlatListProps, Platform } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import Icon from '../Icon'
import Input, { InputProps } from '../Input'
import Label, { InputLabelProps } from '../Label'
import ActionSheet from 'agent/components/Actionsheet/ActionSheet'

const StyledPressable = styled(Pressable)({
  borderRadius: 9,
  backgroundColor: '$secondaryAgent',
})

const StyledContentContainer = styled(View)(
  (props: { safeAreaBottom: number }) => {
    return {
      pb: props.safeAreaBottom,
      bg: 'red',
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
        backgroundColor: '$primaryAgent',
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
            color: '$white',
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
        <Input
          contentContainerProps={{
            sx: {
              backgroundColor: 'transparent',
            },
          }}
          rightInnerElement={
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
              <Icon name="arrow-down" color="$grayAgent" size={18} />
            </MotiView>
          }
          value={selectedItem ? selectedItem.label : value}
          {..._input}
          importantForAccessibility="no"
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          clickableInputContainerProps={{
            sx: {
              ...Platform.select({
                web: {
                  cursor: 'default',
                },
              }),
            },
          }}
        />
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
          {_actionSheetContent ? (
            _actionSheetContent({ closeActionSheet })
          ) : (
            <FlatList
              data={options}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isSelected = item.value === value

                return (
                  <Pressable
                    sx={{
                      backgroundColor: isSelected
                        ? '$primaryAgent'
                        : '$secondaryAgent',
                      py: '$3',
                      px: '$4',
                      borderTopWidth: index === 0 ? 2 : 0,
                      borderBottomWidth: 2,
                      borderColor: '$white',
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
                        color: isSelected ? '#fff' : '#000000',
                        fontWeight: '500',
                      }}
                    >
                      {item?.label}
                    </Text>
                  </Pressable>
                )
              }}
              {..._actionSheetFlatlist}
            />
          )}
        </StyledContentContainer>
      </ActionSheet>
    </View>
  )
}

Select.displayName = 'AgentSelect'

export default forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<CloseSelectForwardRef> }
) => ReturnType<typeof Select>
