import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker'
import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import Label from '../Label'
import DatePickerIOS from './DatePickerIOS'
import { CommonDatePickerProps, OnChangeEvent } from './types'

type IDatePickerProps = CommonDatePickerProps & {
  _android?: AndroidNativeProps
  _ios?: IOSNativeProps
}

/**
 * ### Usage
 * @example
 * ```
 *    <DatePicker
 *        label="Select date"
 *        isRequired
 *        value={new Date()}
 *        rightIcon="date"
 *        _rightIcon={{ size: 20 }}
 *        onChange={(value) => {}}
 *      />
 * ```
 */
const DatePicker = ({
  _android,
  _dateTime,
  _icon,
  _ios,
  _rightIcon,
  defaultDate = dayjs().toDate(),
  error,
  icon,
  onChange,
  placeHolder = '',
  rightIcon,
  value,
  label,
  labelProps,
  isRequired,
  ...restProps
}: IDatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onDateTimePickerChange = (e?: OnChangeEvent, v?: Date) => {
    setShowDatePicker(false)

    if (e?.type === 'dismissed') return

    const dayJsDate = dayjs(v)
    const currentSelectedDate = dayJsDate.startOf('date').toDate()
    onChange(currentSelectedDate)
  }

  return (
    <View sx={{ mt: 20, width: '100%' }} {...restProps}>
      {label ? (
        <Label isRequired={isRequired} {...labelProps}>
          {label}
        </Label>
      ) : null}

      <View
        sx={{
          backgroundColor: '$secondaryAgent',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <TouchableWithoutFeedback onPress={openDatePicker}>
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          >
            {icon && (
              <View
                sx={{
                  alignItems: 'center',
                  mr: '$1',
                }}
              >
                <Icon name={icon} sx={{ color: '$grayAgent' }} {..._icon} />
              </View>
            )}

            <Text
              sx={{
                color: '$grayAgent',
                paddingLeft: '$1',
                paddingRight: 2.5,
                flex: 1,
              }}
            >
              {value ? dayjs(value).format('DD/MM/YYYY') : placeHolder}
            </Text>

            {rightIcon && (
              <View
                sx={{
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={rightIcon}
                  sx={{ color: '$grayAgent' }}
                  {..._rightIcon}
                />
              </View>
            )}

            {Platform.OS === 'ios' ? (
              <DatePickerIOS
                onClose={() => setShowDatePicker(false)}
                isOpen={showDatePicker}
                onChange={onDateTimePickerChange}
                value={value || defaultDate}
                // minimumDate={
                //   _dateTime?.minimumDate ||
                //   dayjs().subtract(2, 'month').startOf('date').toDate()
                // }
                maximumDate={
                  _dateTime?.maximumDate || dayjs().endOf('date').toDate()
                }
                {..._ios}
              />
            ) : (
              showDatePicker && (
                <DateTimePicker
                  is24Hour
                  value={value || defaultDate}
                  onChange={onDateTimePickerChange}
                  // minimumDate={
                  //   _dateTime?.minimumDate ||
                  //   dayjs().subtract(2, 'month').startOf('date').toDate()
                  // }
                  maximumDate={
                    _dateTime?.maximumDate || dayjs().endOf('date').toDate()
                  }
                  {..._android}
                />
              )
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>

      {error && <Text sx={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}

export default DatePicker
