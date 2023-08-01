import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useState } from 'react'
import Image from '../common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useSelector } from 'react-redux'
import { RootState } from 'app/provider/redux/store'

const EventPopupModal = ({ modal: { closeModal } }) => {
  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)
  const { push } = useContextualRouter()
  const agentToken = useSelector((s: RootState) => s.agent.access_token)

  const handlePress = () => {
    agentToken ? push('/agent') : push('/auth/register', { t: 'agent' })
    closeModal()
  }

  const imageWidth = Math.min(300, width * 0.7)
  const imageHeight = (imageWidth / 17) * 18
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
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/popup/agent-recruitment-august.jpg?v=1`,
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

export default EventPopupModal
