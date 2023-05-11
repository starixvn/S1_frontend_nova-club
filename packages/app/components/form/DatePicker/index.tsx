import Icon from 'app/components/Icon'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from 'react-native-date-picker'
import Input, { InputProps } from '../Input'

export interface DatePickerProps
  extends Omit<RNDatePickerProps, 'date'>,
    Pick<InputProps, 'editable' | 'placeholder'> {
  date?: Date
}

export default function DatePicker({
  onConfirm,
  editable,
  placeholder,
  date,
  mode = 'date',
  onCancel,
  ...rest
}: DatePickerProps) {
  const [isFocus, setFocus] = useState(false)
  return (
    <>
      <Input
        icon="date"
        action={<Icon name="down" />}
        onPress={() => {
          setFocus(true)
        }}
        editable={editable}
        placeholder={placeholder}
        value={date ? dayjs(date).format('YYYY-MM-DD').toString() : undefined}
      />
      <RNDatePicker
        modal
        date={date ?? new Date()}
        mode={mode}
        open={isFocus}
        onCancel={() => {
          onCancel && onCancel()
          setFocus(false)
        }}
        onConfirm={(e) => {
          //   console.log('selected date', e)
          onConfirm && onConfirm(e)
          setFocus(false)
        }}
        {...rest}
      />
    </>
  )
}
