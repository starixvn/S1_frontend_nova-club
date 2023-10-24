import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useState } from 'react'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Image from '../common/Image'
import { useRouter } from 'solito/router'
import { useAppSelector } from 'app/provider/redux/store'
import { LoginType } from 'app/features/auth/AuthLayout'
import { useModal } from 'react-native-modalfy'
import useIsDesktop from 'app/hooks/useIsDesktop'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'
import { Linking } from 'react-native'
dayjs.extend(isBetween)

const EventPopupModal = ({ modal: { closeModal } }) => {
  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const { push } = useRouter()
  const { openModal } = useModal()
  const desktop = useIsDesktop()

  const isMidAutumnEventDate = dayjs().isBetween(
    dayjs('2023-09-28 21:00:00'),
    dayjs('2023-09-29 23:59:59')
  )

  const handlePress = () => {
    closeModal()

    if (isMidAutumnEventDate) {
      if (desktop) {
        Linking.openURL(`${DEV_DOMAIN}/event/mid-autumn`)
      } else push('/event/mid-autumn')
    } else {
      agentToken
        ? push('/agent/profile')
        : desktop
        ? setTimeout(() => {
            openModal('AgentLoginModal', {
              t: LoginType.Agent,
            })
          }, 400)
        : push({
            pathname: '/auth/login',
            query: {
              t: LoginType.Agent,
            },
          })
    }
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
                // uri: `${MEDIA_DOMAIN}${CONTENT_URI}/popup-agent-recruitment-v7.jpg?v=1`,
                uri: isMidAutumnEventDate
                  ? `${MEDIA_DOMAIN}${CONTENT_URI}/popup-mid-autumn.jpg?v=1`
                  : `${MEDIA_DOMAIN}${CONTENT_URI}/popup-agent-recruitment-v7.jpg?v=1`,
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
