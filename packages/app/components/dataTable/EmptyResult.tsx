import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Image, Text, View } from 'dripsy'
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
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 250,
        ...containerStyle,
      }}
      {...restProps}
    >
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/common/empty-result.png`,
        }}
        sx={{
          aspectRatio: 1,
          width: width * 0.25,
          height: width * 0.25,
        }}
        resizeMode="contain"
        alt="empty-result"
      />

      <Text
        sx={{
          mt: 4,
          py: 4,
          px: 8,
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
