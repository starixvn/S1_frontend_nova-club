import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { View } from 'dripsy'
import React, { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const FloatingEuroCup = ({ disabled }) => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const visible = useAppSelector((s) => s.tempSetting.isFloatingEuroCupVisible)
  const isDesktop = useIsDesktop()

  const isPrediction = dayjs().isBetween(
    dayjs('2024-06-01T17:00:00.000Z'),
    dayjs('2024-07-14T21:00:00.000Z')
  )

  useEffect(() => {
    // Delay floating icon to prevent drag lagging
    setTimeout(() => {
      dispatch(TempSettingActions.setIsFloatingEuroCupVisible(true))
    }, 2000)
  }, [])

  const handleOpen = () => {
    if (disabled) return
    isPrediction ? push('/euro-cup/prediction') : push('/euro-cup/winner')
  }

  const handleClose = () => {
    dispatch(TempSettingActions.setIsFloatingEuroCupVisible(false))
  }

  return (
    visible && (
      <>
        <TouchableWithoutFeedback onPress={handleOpen} nativeID="pressable">
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/floating-icon-shadow.png`}
            height={127}
            width={80}
            contentPosition="bottom center"
            alt=""
            style={{ position: 'absolute', bottom: 0 }}
            draggable={false}
          />
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/floating-icon.gif`}
            height={127}
            width={80}
            contentPosition="bottom center"
            alt=""
            draggable={false}
          />
        </TouchableWithoutFeedback>

        <View
          sx={{
            position: 'absolute',
            top: 12,
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

export default FloatingEuroCup
