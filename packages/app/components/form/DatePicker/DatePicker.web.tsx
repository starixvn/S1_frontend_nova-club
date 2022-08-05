import Icon from 'app/components/Icon'
import React, { useRef, useState } from 'react'
import { TextInputProps as TextInputNativeProps, ViewProps } from 'react-native'
import { IIconProps } from '../IconButton/type'
import { styled, Text } from 'dripsy'
import dayjsTz from 'app/utils/dayjs'

interface IDatePickerProps extends ViewProps {
  value: Date | '' | undefined
  onChange: (value: Date) => void
  error?: string
  icon?: string
  _icon?: IIconProps
  rightIcon?: string
  _rightIcon?: IIconProps
  _input?: TextInputNativeProps
  _dateTime?: { maximumDate: Date; minimumDate: Date }
  defaultDate?: Date
  placeHolder?: string
}

const InputText = styled(Text)({
  fontSize: [13, 15],
  marginLeft: '$2',
})

const DatePickerWeb = ({
  style,
  value,
  onChange,
  error,
  icon,
  rightIcon,
  _input = {},
  _icon,
  _rightIcon,
  _dateTime,
  defaultDate = dayjsTz().toDate(),
  placeHolder = '',
}: IDatePickerProps) => {
  const datePickerRef = useRef<HTMLInputElement>(null)

  const onDateTimePickerChange = (e: any, v?: Date) => {
    const currentSelectedDate = e.target.value || value
    onChange(currentSelectedDate)
  }

  const currentDate = new Date()
  const getDate = dayjsTz(value).format('YYYY-MM-DD')
  const maxDate = dayjsTz(_dateTime?.maximumDate).format('YYYY-MM-DD')
  const minDate = _dateTime?.minimumDate
    ? dayjsTz(_dateTime?.minimumDate).format('YYYY-MM-DD')
    : dayjsTz(currentDate).subtract(2, 'month').format('YYYY-MM-DD')

  return (
    <div
      className="inputBox"
      style={{ minWidth: 0 }} // min-width: 0 to make flex children occupy until parent max width
    >
      <label className="inputDate">
        {icon && <Icon name={icon} {..._icon} />}
        <InputText>{getDate}</InputText>
      </label>

      <input
        ref={datePickerRef}
        value={getDate}
        type={'date'}
        onChange={onDateTimePickerChange}
        max={maxDate || dayjsTz(currentDate).format('YYYY-MM-DD')}
        min={minDate}
        className={'date-input'}
      />

      {rightIcon && <Icon name={rightIcon} {..._rightIcon} />}
    </div>
  )
}

export default DatePickerWeb
