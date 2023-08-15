import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useState } from 'react'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Image from '../common/Image'

const EventPopupModal = ({ modal: { closeModal } }) => {
  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)

  const handlePress = () => {
    closeModal()
  }

  const imageWidth = Math.min(380, width * 0.7)
  const imageHeight = imageWidth / (800 / 1100)
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
            alignItems: 'center',
          }}
        >
          <>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/popup-agent-recruitment-v7.jpg?v=1`,
              }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
              }}
              onLoadEnd={() => setLoading(false)}
              resizeMode="contain"
              alt=""
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
                  color="$primary.100"
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

export default EventPopupModal
