import RoundedIcon from 'app/components/RoundedIcon'
import SquareSelectorActionSheet, {
  DEFAULT_SQUARE_ACTION_SHEET_ID,
  SquareSelectorActionSheetProps,
  SquareSelectorFlatListProps,
} from 'app/components/actionsheet/SquareSelectorActionSheet'
import { Text, View } from 'dripsy'
import React, { ComponentProps, createRef, useReducer } from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import SelectButton from './SelectButton'
import BankItem from 'app/components/actionsheet/BankItem'

type ButtonProps = ComponentProps<typeof SelectButton>

type SelectSquareProps = {
  buttonProps?: Omit<ButtonProps, 'title' | 'onOpen'>
  buttonTitle?: string
  _actionSheet: SquareSelectorActionSheetProps
  _flatList: SquareSelectorFlatListProps
}

const SelectSquare = ({
  buttonProps,
  buttonTitle = '',
  _flatList,
  _actionSheet,
}: SelectSquareProps) => {
  const { id: actionSheetId } = _actionSheet || {}
  const { setSelectedValue } = _flatList || {}
  const actionSheetRef = createRef()
  const [isActive, toggleIsActive] = useReducer((state) => {
    return !state
  }, false)

  const handleActionSheetOpen = () => {
    SheetManager.show(actionSheetId || DEFAULT_SQUARE_ACTION_SHEET_ID)
  }

  const handleActionSheetClose = async (item) => {
    setSelectedValue(item)
    await SheetManager.hide(actionSheetId || DEFAULT_SQUARE_ACTION_SHEET_ID)
  }

  return (
    <>
      <SelectButton
        onOpen={handleActionSheetOpen}
        title={buttonTitle}
        isActive={isActive}
        {...buttonProps}
      />
      <SquareSelectorActionSheet
        ref={actionSheetRef}
        _flatList={{
          ..._flatList,
          titleType: 'label',
          onPress: (item) => handleActionSheetClose(item),
          // renderItem: ({ item, index }) => (
          //   <BankItem
          //     key={`${index} ${item}`}
          //     icon={require('app/assets/images/home/fishing.png')}
          //     title={item}
          //     onPress={() => handleActionSheetClose(item)}
          //   />
          // ),
        }}
        _actionSheet={{
          ...{ onOpen: toggleIsActive, onClose: toggleIsActive },
          ..._actionSheet,
        }}
      />
    </>
  )
}

export default SelectSquare
