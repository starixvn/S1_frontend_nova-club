import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { SxProp } from 'dripsy'
import React, { useState } from 'react'
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from 'react-native-date-picker'
import Input, { InputProps } from '../Input'

export interface DatePickerProps
  extends Omit<RNDatePickerProps, 'date' | 'onConfirm'>,
    Pick<
      InputProps,
      | 'editable'
      | 'placeholder'
      | 'error'
      | 'responsive'
      | 'label'
      | 'inputContainerSx'
    > {
  value?: Date
  onChange?: (date?: Date) => void
  inputSx?: SxProp
}

export default function DatePicker({
  onChange,
  editable,
  placeholder,
  value,
  error,
  mode = 'date',
  onCancel,
  inputSx,
  ...rest
}: DatePickerProps) {
  const [isFocus, setFocus] = useState(false)
  const { t } = useLocalization()
  return (
    <>
      <Input
        icon="date"
        action={({ color }) => (
          // <InputClearActionRow
          //   isClearable={!!value}
          //   onPress={() => {
          //     onChange && onChange()
          //   }}
          // >
          <Icon name="down" color={color} size={16} />
          // </InputClearActionRow>
        )}
        onPress={() => {
          setFocus(true)
        }}
        sx={inputSx}
        editable={editable}
        placeholder={placeholder}
        error={error}
        value={value ? dayjs(value).format('YYYY-MM-DD').toString() : ''}
        {...rest}
      />
      <RNDatePicker
        title={t('common.selectDate')}
        modal
        date={value ?? new Date()}
        mode={mode}
        open={isFocus}
        onCancel={() => {
          onCancel && onCancel()
          setFocus(false)
        }}
        onConfirm={(e) => {
          //   console.log('selected date', e)
          onChange && onChange(e)
          setFocus(false)
        }}
        {...rest}
      />
    </>
  )
}
