import Text from 'agent/components/Text'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Image, View } from 'dripsy'
import React, { ComponentProps } from 'react'

export type IHistoryEmpty = ComponentProps<typeof View> & {
  text?: string
  _text?: ComponentProps<typeof Text>
}

const EmptyResult = ({ text, _text, ...props }: IHistoryEmpty) => {
  const { t } = useLocalization()
  const { sx: containerStyle, ...restProps } = props
  const { width } = useContainerDimension()

  return (
    <View
      sx={{ alignItems: 'center', justifyContent: 'center', ...containerStyle }}
      {...restProps}
    >
      <Image
        source={require('app/assets/images/empty-result.png')}
        sx={{
          aspectRatio: 1,
          width: width * 0.25,
          height: width * 0.25,
        }}
        resizeMode="contain"
      />

      <Text
        sx={{
          mt: '$2',
          py: '$2',
          px: '$4',
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

export default EmptyResult
