import HorizontalActionSheet, {
  ActionSheetProps,
} from 'app/components/actionsheet/HorizontalActionSheet'
import ListActionSheet from 'app/components/actionsheet/ListActionSheet'
import Icon from 'app/components/Icon'
import { ActivityIndicator } from 'dripsy'
import { useReducer } from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import InputBase, { InputBaseProps } from './InputBase'

export interface SelectProps extends InputBaseProps {
  options: any
  loading?: boolean
  isHorizontalActionSheet?: boolean
  onSelected: (value) => void
  _actionSheet: ActionSheetProps
  buttonComponent?: (SelectButtonComponentProps) => JSX.Element
}

export type SelectButtonComponentProps = Omit<
  SelectProps,
  | 'options'
  | 'loading'
  | 'isHorizontalActionSheet'
  | 'onSelected'
  | '_actionsSheet'
>

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
  buttonComponent,
  ...rest
}: SelectProps) {
  const { sheetId } = _actionSheet

  const [isActive, toggleIsActive] = useReducer((state) => {
    return !state
  }, false)

  function onSelect() {
    SheetManager.show(sheetId)
  }
  const BtnComponent = buttonComponent ?? InputBase

  return (
    <>
      <BtnComponent
        onPress={onSelect}
        editable={!loading}
        isSelecting={isActive}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator sx={{ m: '$2' }} />
        ) : (
          <Icon name="chevdown" size={18} sx={{ ml: '$2' }} />
        )}
      </BtnComponent>

      {isHorizontalActionSheet ? (
        <HorizontalActionSheet
          _actionSheet={_actionSheet}
          data={options}
          onSelect={onSelected}
          onOpen={toggleIsActive}
          onClose={toggleIsActive}
        />
      ) : (
        <ListActionSheet
          _actionSheet={_actionSheet}
          data={options}
          onSelect={onSelected}
          onOpen={toggleIsActive}
          onClose={toggleIsActive}
        />
      )}
    </>
  )
}
