import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useState } from 'react'
import Image from '../common/Image'

const PredictionModal = ({ modal: { closeModal, getParam } }) => {
  const { width, height } = useContainerDimension()
  const onPress = getParam('onPress')
  const [isLoading, setLoading] = useState(true)

  const handlePress = () => {
    onPress()
    closeModal()
  }

  const imageWidth = Math.min(500, width * 0.8)
  const imageHeight = imageWidth / (782 / 900)
  return (
    <View
      sx={{
        height: Math.min(height * 0.9, imageHeight),
      }}
    >
      <ScrollView bounces={false}>
        <TouchableOpacity
          onPress={handlePress}
          sx={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/wc-winner.png?v=1`,
              }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
              }}
              onLoadEnd={() => setLoading(false)}
              resizeMode="contain"
            />
            {isLoading ? (
              <View
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator
                  size="large"
                  color="$lightCyan"
                  sx={{ position: 'absolute' }}
                />
              </View>
            ) : null}
          </>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default PredictionModal
