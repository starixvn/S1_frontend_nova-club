import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import Icon from '../Icon'

export type IHistoryEmpty = ComponentProps<typeof View> & {
  text?: string
  _text?: ComponentProps<typeof Text>
}

const HistoryEmpty = ({ text, _text, ...props }: IHistoryEmpty) => {
  const { t } = useLocalization()
  const { sx: containerStyle, ...restProps } = props

  return (
    <View
      sx={{ alignItems: 'center', justifyContent: 'center', ...containerStyle }}
      {...restProps}
    >
      <Icon name="cross" size={60} />

      <Text
        sx={{
          mt: '2',
          py: '2',
          px: '4',
          color: 'white',
          bg: 'rgba(0, 0, 0, 0.2)',
        }}
        {..._text}
      >
        {text ?? t('common.noInfoAvailable')}
      </Text>
    </View>
  )
}

export default HistoryEmpty
