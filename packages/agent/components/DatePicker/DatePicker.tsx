import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import dayjs from 'dayjs'
import { SxProp, View } from 'dripsy'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import RNDatePicker from 'react-native-date-picker'
import Label from '../Label'
import { CommonDatePickerProps } from './types'

type IDatePickerProps = CommonDatePickerProps & {
  value?: Date
  onChange?: (date?: Date) => void
  inputSx?: SxProp
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
  _icon,
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
  mode = 'date',
  onCancel,
  inputSx,
  ...restProps
}: IDatePickerProps) => {
  const [isFocus, setFocus] = useState(false)

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
        <TouchableWithoutFeedback
          onPress={() => {
            setFocus(true)
          }}
          // onPress={openDatePicker}
        >
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
                color: 'black',
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
                onChange && onChange(e)
                setFocus(false)
              }}
              {...restProps}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {error && <Text sx={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}

export default DatePicker
