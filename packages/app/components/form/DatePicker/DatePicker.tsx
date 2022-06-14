import DateTimePicker, {
  AndroidNativeProps,
} from '@react-native-community/datetimepicker'
import Icon, { IconComponentProps } from 'app/components/Icon'
import dayjs from 'dayjs'
import { styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import {
  Platform,
  TextInputProps as TextInputNativeProps,
  TouchableWithoutFeedback,
  ViewProps,
  ViewStyle,
  View as RView,
} from 'react-native'
import { IIconProps } from '../IconButton/type'
import DatePickerIOS from './DatePickerIOS'
import DatePickerWeb from './DatePicker.web'

interface IDatePickerProps extends ViewProps {
  value: Date | '' | undefined
  onChange: (value: Date) => void
  error?: string
  icon?: string
  _icon?: IIconProps
  rightIcon?: string
  _rightIcon?: IIconProps
  _input?: TextInputNativeProps
  _dateTime?: Omit<AndroidNativeProps, 'value'> // Exlude "value" due to prop already include "value"
  defaultDate?: Date
  placeHolder?: string
}

const DatePicker = ({
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
  const { style: inputStyle, ...restInputProps } = _input
  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onDateTimePickerChange = (e: any, v?: Date) => {
    setShowDatePicker(false)
    if (e?.type === 'dismissed') return
    const dayJsDate = dayjs(v)
    const currentSelectedDate = dayJsDate.startOf('date').toDate()
    onChange(currentSelectedDate)
  }

  return (
    <RView style={style}>
      <View
        sx={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '$lightNavyBlue',
        }}
      >
        <TouchableWithoutFeedback onPress={openDatePicker}>
          <StyledView>
            {icon && (
              <View
                sx={{
                  alignItems: 'center',
                }}
              >
                <Icon name={icon} {..._icon} />
              </View>
            )}
            <Text
              sx={{
                color: 'white',
                paddingLeft: '$1',
                paddingRight: 2.5,
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
                <Icon name={rightIcon} {..._rightIcon} />
              </View>
            )}
            {Platform.OS === 'ios' ? (
              <DatePickerIOS
                onClose={() => setShowDatePicker(false)}
                isOpen={showDatePicker}
                onChange={onDateTimePickerChange}
                value={value || defaultDate}
                maximumDate={
                  _dateTime?.maximumDate || dayjs().endOf('date').toDate()
                }
              />
            ) : (
              showDatePicker && (
                <DateTimePicker
                  mode={_dateTime?.mode || 'date'}
                  value={value || defaultDate}
                  display={_dateTime?.display || 'default'}
                  onChange={onDateTimePickerChange}
                  maximumDate={
                    _dateTime?.maximumDate || dayjs().endOf('date').toDate()
                  }
                />
              )
            )}
          </StyledView>
        </TouchableWithoutFeedback>
      </View>
      {error && <Text sx={{ color: 'red' }}>{error}</Text>}
    </RView>
  )
}

const StyledView = styled(View)({
  height: 40,
  flexDirection: 'row',
  borderRadius: 10,
  width: '100%',
  backgroundColor: '$primary',
  alignItems: 'center',
  justifyContent: 'center',
})

export default DatePicker
