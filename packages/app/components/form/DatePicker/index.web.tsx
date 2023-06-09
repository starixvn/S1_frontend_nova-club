import dayjs from 'dayjs'
import { DatePickerProps as RNDatePickerProps } from 'react-native-date-picker'
import Input, { InputProps } from '../Input'
import { ChangeEvent, useRef } from 'react'
import InputClearActionRow from '../InputClearActionRow'
import Icon from 'app/components/Icon'
import { SxProp } from 'dripsy'

export interface DatePickerProps
  extends Omit<RNDatePickerProps, 'date' | 'onConfirm'>,
    Pick<InputProps, 'editable' | 'placeholder'> {
  value?: Date
  onChange?: (date?: Date) => void
  inputSx?: SxProp
}

const IS_IOS =
  typeof window !== 'undefined'
    ? /iPad|iPhone|iPod/.test(window.navigator?.userAgent)
    : false

export default function DatePicker({
  value,
  onChange,
  maximumDate,
  minimumDate,
  inputSx,
  ...rest
}: DatePickerProps) {
  const datePickerRef = useRef<HTMLInputElement>(null)
  const _localValue = useRef<Date | null>()
  const onDateTimePickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSelectedDate = e.target.valueAsDate || value

    if (currentSelectedDate) {
      if (!IS_IOS) {
        onChange && onChange(currentSelectedDate)
      } else {
        // If its IOS Mobile Browser Picker, when clicking on any date before clicking done will trigger onChange,
        // Storing temp value before "Done" is clicked, real value will be assigned on blur
        _localValue.current = e.target.valueAsDate
      }
    }
  }

  function dateToString(d?: Date, format: string = 'YYYY-MM-DD') {
    return d ? dayjs(d).format(format) : ''
  }

  return (
    <Input
      sx={inputSx}
      icon={'date'}
      editable={true}
      value={dateToString(value)}
      action={({ color }) => (
        // <InputClearActionRow
        //   isClearable={!!value}
        //   onPress={() => {
        //     onChange && onChange()
        //     _localValue.current = null
        //   }}
        // >
        <Icon name="down" color={color} />
        // </InputClearActionRow>
      )}
      {...rest}
    >
      <input
        ref={datePickerRef}
        value={dateToString(value)}
        type={'date'}
        onChange={onDateTimePickerChange}
        max={maximumDate && dateToString(maximumDate, 'YYYY-MM-DD')} // Browser date format
        min={minimumDate && dateToString(minimumDate, 'YYYY-MM-DD')} // Browser date format
        onBlur={() => {
          if (IS_IOS && _localValue.current)
            onChange && onChange(_localValue.current)
        }}
      />
    </Input>
  )
}
