import dayjs from 'dayjs'
import React, { useState } from 'react'
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from 'react-native-date-picker'
import Input, { InputProps } from '../Input'
import InputClearActionRow from '../InputClearActionRow'
import Icon from 'app/components/Icon'

export interface DatePickerProps
  extends Omit<RNDatePickerProps, 'date' | 'onConfirm'>,
    Pick<InputProps, 'editable' | 'placeholder'> {
  value?: Date
  onChange?: (date?: Date) => void
}

export default function DatePicker({
  onChange,
  editable,
  placeholder,
  value,
  mode = 'date',
  onCancel,
  ...rest
}: DatePickerProps) {
  const [isFocus, setFocus] = useState(false)
  return (
    <>
      <Input
        icon="date"
        action={
          <InputClearActionRow
            isClearable={!!value}
            onPress={() => {
              onChange && onChange()
            }}
          >
            <Icon name="down" />
          </InputClearActionRow>
        }
        onPress={() => {
          setFocus(true)
        }}
        editable={editable}
        placeholder={placeholder}
        value={value ? dayjs(value).format('YYYY-MM-DD').toString() : ''}
      />
      <RNDatePicker
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
