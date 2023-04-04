import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import dayjs from 'dayjs'
import { styled, View } from 'dripsy'
import React, { ChangeEvent, useRef } from 'react'
import Label from '../Label'
import { CommonDatePickerProps } from './types'

type IDatePickerProps = CommonDatePickerProps

const InputText = styled(Text)({
  fontSize: [13, 15],
  marginLeft: '$2',
})

const DatePickerWeb = ({
  value,
  onChange,
  icon,
  rightIcon,
  _icon,
  _rightIcon,
  _dateTime,
  error,
  label,
  labelProps,
  isRequired,
  ...restProps
}: IDatePickerProps) => {
  const datePickerRef = useRef<HTMLInputElement>(null)

  const onDateTimePickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSelectedDate = e.target.valueAsDate || value
    onChange(currentSelectedDate)
  }

  const currentDate = new Date()
  const getDate = dayjs(value).format('YYYY-MM-DD')
  const maxDate = dayjs(_dateTime?.maximumDate).format('YYYY-MM-DD')
  const minDate = _dateTime?.minimumDate
    ? dayjs(_dateTime?.minimumDate).format('YYYY-MM-DD')
    : dayjs(currentDate).subtract(2, 'month').format('YYYY-MM-DD')

  return (
    <View sx={{ mt: 20, width: '100%' }} {...restProps}>
      {label ? (
        <Label isRequired={isRequired} {...labelProps}>
          {label}
        </Label>
      ) : null}

      <View
        sx={{
          alignItems: 'center',
          backgroundColor: '$secondaryAgent',
          borderRadius: 10,
          flexDirection: 'row',
          flex: 1,
          padding: 10,
          position: 'relative',
          textAlign: 'center',
          justifyContent: 'space-between',
          minWidth: 0,
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon && <Icon name={icon} {..._icon} />}
          <InputText>{getDate}</InputText>
        </View>

        <input
          ref={datePickerRef}
          value={getDate}
          type={'date'}
          onChange={onDateTimePickerChange}
          max={maxDate || dayjs(currentDate).format('YYYY-MM-DD')}
          min={minDate}
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            color: 'white',
            textAlign: 'center',
            outline: 0,
            opacity: 0,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />

        {rightIcon && (
          <Icon color="$grayAgent" name={rightIcon} {..._rightIcon} />
        )}
      </View>

      {error && <Text sx={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}

export default DatePickerWeb
