import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useEffect, useMemo } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useModal } from 'react-native-modalfy'
import { useGetMysteryCheckQuery } from 'services/eventApi'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import { RewardGameKeyMap } from 'utils/rewards'

const FloatingMystery = ({ disabled }) => {
  const dispatch = useAppDispatch()
  const { openModal } = useModal()
  const { push } = useRouter()
  const visible = useAppSelector((s) => s.tempSetting.isFloatingMysteryVisible)
  const isDesktop = useIsDesktop()

  const { data } = useGetMysteryCheckQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const isMysteryEligible = data?.data?.key

  const handleOpen = () => {
    if (disabled) return

    if (isMysteryEligible) {
      if (isDesktop) {
        openModal('RewardGameModal', {
          persistent: true,
          key: RewardGameKeyMap.MYSTERY_DROP,
        })
      } else
        push({
          pathname: '/rewards/launcher',
          query: {
            key: RewardGameKeyMap.MYSTERY_DROP,
          },
        })
    } else push('/event/mystery-drop')
  }

  const handleClose = () => {
    dispatch(TempSettingActions.setIsFloatingMysteryVisible(false))
  }

  const AnimatedText = useMemo(
    () => (
      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 0.8 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
        style={{
          position: 'absolute',
          right: isDesktop ? 36 : 18,
          bottom: isDesktop ? 16 : 10,
          width: isDesktop ? 24 : 20,
          height: isDesktop ? 24 : 20,
          backgroundColor: '#2a8a0d',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: 18, fontWeight: 'bold' }}>1</Text>
      </MotiView>
    ),
    []
  )

  useEffect(() => {
    // Delay floating icon to prevent drag lagging
    setTimeout(() => {
      dispatch(TempSettingActions.setIsFloatingMysteryVisible(true))
    }, 2000)
  }, [])

  return (
    visible && (
      <>
        <TouchableWithoutFeedback onPress={handleOpen} nativeID="pressable">
          <>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/floating-mystery-icon.gif`}
              height={isDesktop ? 90 : 63}
              width={isDesktop ? 160 : 100}
              contentPosition="bottom center"
              alt=""
              draggable={false}
            />

            {isMysteryEligible && AnimatedText}
          </>
        </TouchableWithoutFeedback>

        <View
          sx={{
            position: 'absolute',
            top: -16,
            left: isDesktop ? 0 : undefined,
            right: isDesktop ? undefined : 0,
          }}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View
              sx={{
                zIndex: 10,
                bg: '#f06d4f',
                borderRadius: 50,
                p: 4,
              }}
            >
              <Icon name="cross" color="white" size={10} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    )
  )
}

export default FloatingMystery
