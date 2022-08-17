import { ActionSheetBaseProps } from 'app/components/actionsheet/ActionSheetBase'
import HorizontalActionSheet, {
  HorizontalActionSheetProps,
} from 'app/components/actionsheet/HorizontalActionSheet'
import ListActionSheet from 'app/components/actionsheet/ListActionSheet'
import { SquareSelectorForwardRef } from 'app/components/actionsheet/SquareSelectorActionSheet'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { ActivityIndicator } from 'dripsy'
import { useRef } from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import IconButton from '../IconButton'
import InputBase, { InputBaseProps } from './InputBase'

export interface SelectProps extends InputBaseProps {
  options: any
  loading?: boolean
  isHorizontalActionSheet?: boolean
  onSelected: (value) => void
  _actionSheet: ActionSheetBaseProps
}

/**
 * @example
 * <Select
 *   sx={{ mb: 0, mt: '$2' }}
 *   label={t('bank.selectBank')}
 *   options={sheetData}
 *   value={values.bank?.BankAccountFullName}
 *   onSelected={handleSelected}
 *   _actionSheet={{
 *     sheetId: ACTION_SHEET_ID.BASE,
 *     headerTitle: t('bank.bank'),
 *     actions: [
 *       {
 *         icon: 'cross',
 *         onPress: () => SheetManaget.show(ACTION_SHEET_ID.BASE),
 *       },
 *     ],
 *   }}
 * />
 */
export default function Select({
  options,
  loading,
  isHorizontalActionSheet = false,
  onSelected,
  _actionSheet,
  ...rest
}: SelectProps) {
  const { sheetId } = _actionSheet

  function onSelect() {
    SheetManager.show(sheetId)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onSelect}>
        <InputBase
          editable={!loading}
          action={
            loading ? (
              <ActivityIndicator sx={{ m: '$2' }} />
            ) : (
              <IconButton name="chevdown" size={18} />
            )
          }
          containerProps={{ pointerEvents: 'none' }}
          {...rest}
        />
      </TouchableWithoutFeedback>
      {isHorizontalActionSheet ? (
        <HorizontalActionSheet
          _actionSheet={_actionSheet}
          data={options}
          onSelect={onSelected}
        />
      ) : (
        <ListActionSheet
          _actionSheet={_actionSheet}
          data={options}
          onSelect={onSelected}
        />
      )}
    </>
  )
}
