import { StyleableSxProperties, StyledProps, Sx, SxProp, Text, View } from 'dripsy';
import React from 'react';
import { TextProps, ViewProps } from 'react-native';
import Icon from '../Icon';

export interface IHistoryEmpty extends Sx {
  text?: string;
  _textProps?: SxProp;
}

const HistoryEmpty = ({ text, _textProps, ...props }: IHistoryEmpty) => {

  return (
    <View sx={{ alignItems: 'center', ...props }}>
      <Icon name='cross' />

      <Text
        sx={{
          mt: '$2',
          py: '$2',
          px: '$4',
          bg: '$lightNavyBlue',
          ..._textProps
        }}>
        {text ?? 'No information is available now'}
      </Text>
    </View>
  );
};

export default HistoryEmpty;
