import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { LoginType } from 'app/features/auth/AuthLayout'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import Image from '../common/Image'
import TouchableOpacity from '../pressable/TouchableOpacity'
import { SettingActions } from 'app/store/setting.slice'
dayjs.extend(isBetween)

const EventPopupModal = ({ modal: { closeModal } }) => {
  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const rewardPopup = useAppSelector((s) => s.setting.rewardPopup)
  const { push } = useRouter()
  const { openModal } = useModal()
  const desktop = useIsDesktop()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SettingActions.toggleRewardPopupSwitch())
  }, [])

  const handlePress = () => {
    closeModal()
    if (rewardPopup === 3) {
      agentToken
        ? push('/agent/profile')
        : desktop
        ? setTimeout(() => {
            openModal('AgentLoginModal', {
              t: LoginType.Agent,
            })
          }, 500)
        : push({
            pathname: '/auth/login',
            query: {
              t: LoginType.Agent,
            },
          })
    } else {
      if (desktop) {
        push('/rewards/redeem/list')
        rewardPopup === 1 &&
          setTimeout(() => {
            openModal('DailyCheckInModal')
          }, 500)
      } else {
        rewardPopup === 1
          ? push('/rewards/daily')
          : push('/rewards/redeem/list')
      }
    }
  }

  const imageWidth = Math.min(380, width * 0.7)
  const imageHeight = imageWidth / (800 / 1100)

  const imageUrl =
    rewardPopup === 1
      ? `${MEDIA_DOMAIN}${CONTENT_URI}/popup-daily-checkin.jpg`
      : rewardPopup === 2
      ? `${MEDIA_DOMAIN}${CONTENT_URI}/popup-rewards.png`
      : `${MEDIA_DOMAIN}${CONTENT_URI}/popup-agent-recruitment-v7.jpg?v=1`

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
