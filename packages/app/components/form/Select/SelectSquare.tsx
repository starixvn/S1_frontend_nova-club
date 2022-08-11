import SquareSelectorActionSheet, {
  DEFAULT_SQUARE_ACTION_SHEET_ID,
  SquareSelectorActionSheetProps,
  SquareSelectorFlatListProps,
} from 'app/components/actionsheet/SquareSelectorActionSheet'
import React, {
  ComponentProps,
  Dispatch,
  forwardRef,
  SetStateAction,
  useReducer,
  useState,
} from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import SelectButton from './SelectButton'

type ButtonProps = ComponentProps<typeof SelectButton>

type SelectSquareProps = {
  isShowButton?: boolean
  buttonProps?: Omit<ButtonProps, 'title' | 'onOpen'>
  buttonTitle?: string
  _actionSheet: SquareSelectorActionSheetProps
  _dataList: SquareSelectorFlatListProps
  actionSheetProps?: Omit<
    ComponentProps<typeof SquareSelectorActionSheet>,
    '_dataList' | '_actionSheet'
  >
  setIcon?: Dispatch<SetStateAction<string>>
}

const SelectSquare = (
  {
    isShowButton = true,
    buttonProps,
    buttonTitle = '',
    _dataList,
    _actionSheet,
    actionSheetProps,
    setIcon,
  }: SelectSquareProps,
  ref: any
) => {
  const { id: actionSheetId } = _actionSheet || {}
  const { setSelectedValue } = _dataList || {}
  const [isActive, toggleIsActive] = useReducer((state) => {
    return !state
  }, false)
  const [selectedIcon, setSelectedIcon] = useState()

  const handleActionSheetOpen = () => {
    SheetManager.show(actionSheetId || DEFAULT_SQUARE_ACTION_SHEET_ID)
  }

  const handleActionSheetClose = async (item) => {
    setSelectedValue(item)
    setSelectedIcon(item.logo)
    setIcon?.(item.logo)
    await SheetManager.hide(actionSheetId || DEFAULT_SQUARE_ACTION_SHEET_ID)
  }

  return (
    <>
      {isShowButton && (
        <SelectButton
          onOpen={handleActionSheetOpen}
          title={buttonTitle}
          icon={selectedIcon}
          isActive={isActive}
          {...buttonProps}
        />
      )}
      <SquareSelectorActionSheet
        ref={ref}
        _dataList={{
          ..._dataList,
          titleType: 'value',
          logo: 'provider',
          onPress: (item) => handleActionSheetClose(item),
        }}
        _actionSheet={{
          ...{ onOpen: toggleIsActive, onClose: toggleIsActive },
          ..._actionSheet,
        }}
        {...actionSheetProps}
      />
    </>
  )
}

export default forwardRef(SelectSquare)
