import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useWcTicketCountQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'
import BubbleEdge from './Bubble/BubbleEdge'

const FloatingPrediction = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { width } = useWindowDimensions()
  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('wc-prediction')
  const [isShowBubble, setShowBubble] = useState(false)

  const { predictCount, isFetching } = useWcTicketCountQuery(undefined, {
    selectFromResult: (s) => ({ ...s, predictCount: s.data?.data?.count }),
  })

  const iconSize = Math.min(110, width * 0.2)
  const fillColor = '#603'
  const edgeColor = '#fff'

  const launchPrediction = () => {
    setShowBubble(false)
    push(to, '/event/wcprediction')
  }

  useEffect(() => {
    predictCount && predictCount > 0 && setShowBubble(true)
  }, [predictCount])

  return (
    <TouchableOpacity onPress={launchPrediction} sx={{ alignItems: 'center' }}>
      <View
        sx={{
          mb: '$1',
          minWidth: 105,
          right: iconSize === 110 ? 0 : 4,
          zIndex: 2,
        }}
      >
        {isShowBubble ? (
          <>
            <View
              sx={{
                minHeight: 50,
                borderRadius: 100 / 2,
                px: '$3a',
                bg: fillColor,
                borderColor: edgeColor,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{`${t('event.youHave')} ${predictCount ?? 0}`}</Text>
              <Text>{t('event.ticket')}</Text>
            </View>
            <View
              sx={{
                position: 'absolute',
                bottom: -19,
                right: 20,
              }}
            >
              <BubbleEdge size={20} fill={fillColor} edge={edgeColor} />
            </View>
          </>
        ) : null}
      </View>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/predict-floating.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
          zIndex: 1,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default FloatingPrediction
