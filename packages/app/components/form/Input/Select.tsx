import SquareSelectorActionSheet, {
  SquareSelectorForwardRef,
} from 'app/components/actionsheet/SquareSelectorActionSheet'
import Icon from 'app/components/Icon'
import { ActivityIndicator } from 'dripsy'
import { useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import IconButton from '../IconButton'
import InputBase, { InputBaseProps } from './InputBase'

export interface SelectProps extends InputBaseProps {
  options: any
  loading?: boolean
  onChange: (value) => void
}

export default function Select({ options, loading, ...rest }: SelectProps) {
  const sheetRef = useRef<SquareSelectorForwardRef>(null)

  function onSelect() {
    SheetManager.show('test', {})
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
      <SquareSelectorActionSheet
        ref={sheetRef}
        _dataList={options}
        // _actionSheet={_actionSheet}
      />
    </>
  )
}
