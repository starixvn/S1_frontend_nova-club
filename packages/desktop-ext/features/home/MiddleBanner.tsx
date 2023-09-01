import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Pressable, Row, View } from 'dripsy'
import React, { ComponentProps, useCallback } from 'react'
import { useRouter } from 'solito/router'
import VideoBanner from './VideoBanner'
import useLocalization from 'app/provider/localization'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { SabaGamePayload } from 'app/constants/game'

const subs = [
  {
    label: 'game.category.liveCasino',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/livecasino_350.mp4`,
    onPress: '/livecasino',
  },
  {
    label: 'game.category.fishing',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/fishing_350.mp4`,
    onPress: '/games/fishing',
  },
  {
    label: 'game.category.lottery',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/keno_350.mp4`,
    onPress: '/games/keno-lottery',
  },
]

type MiddleBannerProps = ComponentProps<typeof View>

const MiddleBanner = (props: MiddleBannerProps) => {
  const { push } = useRouter()
  const { t } = useLocalization()

  const launchSaba = useCallback(
    () =>
      getAction({
        type: ActionType.GAME,
        payload: {
          desktopMode: true,
          game: SabaGamePayload,
        },
      })(),
    []
  )

  return (
    <View {...props}>
      <Pressable onPress={launchSaba}>
        <VideoBanner
          sx={{ aspectRatio: 880 / 420 }}
          uri={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/sportsbook_680.mp4`}
          label={t('game.category.sportsbook')}
        />
      </Pressable>
      <Row sx={{ flex: 1, gap: '$3' }}>
        {subs.map((s) => {
          return (
            <Pressable
              key={s.label}
              sx={{ flex: 1, position: 'relative' }}
              onPress={() => push(s.onPress)}
            >
              <VideoBanner
                stretchedLabel
                sx={{ flex: 1, position: 'relative' }}
                uri={s.video}
                label={t(s.label)}
              />
            </Pressable>
          )
        })}
      </Row>
    </View>
  )
}
export default MiddleBanner
