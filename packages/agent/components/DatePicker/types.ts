import {
  BaseProps,
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker'
import { IconComponentProps } from 'app/components/Icon'
import { View } from 'dripsy'
import { ComponentProps } from 'react'
import { InputLabelProps } from '../Label'

type ViewProps = ComponentProps<typeof View>
type IconProps = Omit<IconComponentProps, 'name'>

type LeftIconRequired = {
  icon: string
  _icon?: IconProps
}
type LeftIconOmitted = {
  icon?: undefined
  _icon?: undefined
}
type LeftIconProps = LeftIconRequired | LeftIconOmitted

type RightIconRequired = {
  rightIcon: string
  _rightIcon?: IconProps
}
type RightIconOmitted = {
  rightIcon?: undefined
  _rightIcon?: undefined
}
type RightIconProps = RightIconRequired | RightIconOmitted

export type CommonDatePickerProps = ViewProps & {
  _dateTime?: Pick<BaseProps, 'minimumDate' | 'maximumDate'>
  defaultDate?: Date
  error?: string
  onChange: (value: Date) => void
  placeHolder?: string
  value: Date
  label?: string
  labelProps?: Omit<InputLabelProps, 'isRequired'>
  isRequired?: InputLabelProps['isRequired']
} & RightIconProps &
  LeftIconProps

export type OnChangeEvent = AndroidEvent | Event
