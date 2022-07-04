import Icon from 'app/components/Icon'
import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import { TextInputProps as TextInputNativeProps, ViewProps } from 'react-native'
import { IIconProps } from '../IconButton/type'

interface IDatePickerProps extends ViewProps {
  value: Date | '' | undefined
  onChange: (value: Date) => void
  error?: string
  icon?: string
  _icon?: IIconProps
  rightIcon?: string
  _rightIcon?: IIconProps
  _input?: TextInputNativeProps
  _dateTime?: Date // Exlude "value" due to prop already include "value"
  defaultDate?: Date
  placeHolder?: string
}

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
  defaultDate = dayjs().toDate(),
  placeHolder = '',
}: IDatePickerProps) => {
  const [datepicker, setDatepicker] = useState()
  const dateRef = useRef()

  const handleInputClick = () => {
    datepicker?.input?.focus()
  }

  const onDateTimePickerChange = (e: any, v?: Date) => {
    const currentSelectedDate = e.target.value
    onChange(currentSelectedDate)
  }
  const getDate = dayjs(value).format('YYYY-MM-DD')
  const maxDate = dayjs(_dateTime?.maximumDate).format('YYYY-MM-DD')
  const minDate = _dateTime?.minimumDate
    ? dayjs(_dateTime?.minimumDate).format('YYYY-MM-DD')
    : dayjs(currentDate).subtract(2, 'month').format('YYYY-MM-DD')
  const currentDate = new Date()

  return (
    <div className="inputBox" onClick={handleInputClick}>
      <label className="inputDate">
        {icon && <Icon name={icon} {..._icon} />}
        <input
          ref={(datepicker) => setDatepicker(datepicker)}
          value={getDate}
          type={'date'}
          onChange={onDateTimePickerChange}
          max={maxDate || dayjs(currentDate).format('YYYY-MM-DD')}
          min={minDate}
          className={'date-input'}
        />
        {rightIcon && <Icon name={rightIcon} {..._rightIcon} />}
      </label>
    </div>
  )
}

export default DatePickerWeb
