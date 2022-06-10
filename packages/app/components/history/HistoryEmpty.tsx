import {
  StyleableSxProperties,
  StyledProps,
  Sx,
  SxProp,
  Text,
  View,
} from 'dripsy'
import React from 'react'
import { TextProps, ViewProps } from 'react-native'
import Icon from '../Icon'

export interface IHistoryEmpty extends Sx {
  text?: string
  _textProps?: SxProp
}

const HistoryEmpty = ({ text, _textProps, ...props }: IHistoryEmpty) => {
  return (
    <View sx={{ alignItems: 'center', ...props }}>
      <Icon name="cross" />

      <Text
        sx={{
          mt: '$1',
          py: '$1',
          px: '$2',
          bg: '$lightNavyBlue',
          ..._textProps,
        }}
      >
        {text ?? 'No information is available now'}
      </Text>
    </View>
  )
}

export default HistoryEmpty
