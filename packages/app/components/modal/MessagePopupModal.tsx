import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useState } from 'react'
import Image from '../common/Image'
import { useAppSelector } from 'app/provider/redux/store'
import { LANGUAGE_CODE } from 'app/constant/language'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'

const MessagePopupModal = ({ modal: { closeModal, closeAllModals } }) => {
  const { width, height } = useContainerDimension()
  const { push } = useContextualRouter()
  const [isLoading, setLoading] = useState(true)
  const lang = useAppSelector((state) => state.setting.locale)

  const handlePress = () => {
    closeAllModals()
    push('/messages', {
      tab: 0,
    })
  }

  const imageWidth = Math.min(300, width * 0.7)
  const imageHeight = imageWidth / (800 / 1100)

  const imageUrl =
    lang === LANGUAGE_CODE.ENGLISH
      ? `${MEDIA_DOMAIN}${CONTENT_URI}/banners/new-mail-en.gif`
      : `${MEDIA_DOMAIN}${CONTENT_URI}/banners/new-mail-vi.gif`

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
                uri: imageUrl,
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

export default MessagePopupModal
