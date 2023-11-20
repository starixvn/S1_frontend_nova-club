import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import {
  PopupMapping,
  getCarouselBannerActionGenerator,
} from 'app/utils/carouselBannerActionGenerator'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useBannerQuery } from 'services/contentApi'
import { useRouter } from 'solito/router'
import Image from '../common/Image'
import TouchableOpacity from '../pressable/TouchableOpacity'
dayjs.extend(isBetween)

const EventPopupModal = ({ modal: { closeModal } }) => {
  const { data } = useBannerQuery()
  const popUpBanner =
    data?.filter((el) => el.banner_display_page === 'popup') ?? []

  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)

  const { push } = useRouter()
  const { openModal } = useModal()
  const desktop = useIsDesktop()
  const dispatch = useAppDispatch()
  const locale = useAppSelector((s) => s.setting.locale)
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const rewardPopup = useAppSelector((s) => s.setting.rewardPopup)

  const bannerSeq = rewardPopup % popUpBanner?.length
  const banner = popUpBanner.find((el, index) => index === bannerSeq)

  useEffect(() => {
    dispatch(SettingActions.toggleRewardPopupSwitch())
  }, [])

  const onPressCallback = useCallback(() => {
    closeModal()

    const mappedBannerAction = PopupMapping.find(
      (el) => el.url === banner?.banner_url
    )

    const defaultBannerAction = {
      desktopType: banner?.banner_url_redirection,
      type: banner?.banner_url_redirection,
      payload: {
        uri: banner?.banner_url,
        desktopUri: banner?.banner_url,
      },
    }

    const bannerAction = mappedBannerAction
      ? mappedBannerAction.bannerAction
      : defaultBannerAction
    const actionType = desktop ? bannerAction.desktopType : bannerAction.type

    const action = getCarouselBannerActionGenerator(
      bannerAction,
      desktop,
      actionType
    )

    setTimeout(() => {
      action({ push, locale, openModal })
    }, 500)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner?.banner_url])

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
          onPress={onPressCallback}
          sx={{
            width: imageWidth,
            height: imageHeight,
            alignItems: 'center',
          }}
        >
          <>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${banner?.banner_image}`,
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
