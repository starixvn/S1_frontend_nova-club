import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import {
  PopupMapping,
  getCarouselBannerActionGenerator,
} from 'app/utils/carouselBannerActionGenerator'
import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'dripsy'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { BannerItem } from 'services/contentApi.type'
import { useRouter } from 'solito/router'
import { useHomeEventModal } from '../../HomeEventModal'

type Props = {
  data: BannerItem
}

const Content = memo(({ data }: Props) => {
  const { width, height } = useHomeEventModal().dimension
  const [isLoading, setLoading] = useState(true)
  const { openModal, closeModal } = useModal()

  const callbackRef = useRef<() => void>()

  const { push } = useRouter()
  const desktop = useIsDesktop()
  const locale = useAppSelector((s) => s.setting.locale)

  const banner = data

  useEffect(() => {
    return () => {
      callbackRef.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPressCallback = useCallback(() => {
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

    if (desktop && banner?.banner_url === '/rewards/daily') {
      push('/rewards/redeem/list')
    }

    closeModal()

    /* using open modal after desktop navigate will appear */
    callbackRef.current = () => action({ push, locale, openModal })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner?.banner_url])

  const imageWidth = Math.min(450, width * 0.95)
  const imageHeight = imageWidth / (800 / 1100)

  return (
    <View
      sx={{
        height: Math.min(height * 0.9, imageHeight),
      }}
    >
      <ScrollView bounces={false}>
        <Pressable
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
        </Pressable>
      </ScrollView>
    </View>
  )
})

export default Content
