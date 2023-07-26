import { DEV_DOMAIN } from '@env'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { ActivityIndicator, Container, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { IResponse } from 'services/common/types'
import { gameApi, useGoToGameMutation } from 'services/gameApi'
import { GetGameUrlResult } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'

type Props = {}

export default function SabaScreen({}: Props) {
  const [goToGame] = useGoToGameMutation()
  const [error, setError] = useState<string | undefined>()
  const [gameUrl, setGameUrl] = useState<string | undefined>()

  const dispatch = useAppDispatch()

  const authState = useAppSelector((s) => s.auth)
  const isLoggedIn = !!authState.info

  const locale = useAppSelector((s) => s.setting.locale)

  async function getSabaGame() {
    const api = isLoggedIn
      ? gameApi.endpoints.goToGame
      : gameApi.endpoints.demoGame

    const { data, success } = await dispatch(
      api.initiate({
        game_code: '1',
        is_demo: isLoggedIn ? 0 : 1,
        is_mobile: 0,
        platform_code: 'SABA',
        home_url: '#',
        cashier_url: `#`,
      })
    )
      .unwrap()
      .catch((e: IResponse<GetGameUrlResult>) => {
        setError(e.message)
        return e
      })

    if (success && data) {
      let url = data.url
      setGameUrl(url + window.location.search)
    }
  }

  useEffect(() => {
    getSabaGame()
  }, [locale])

  return (
    <Container
      sx={{
        height: `calc(100vh - ${NAVIGATION_HEIGHT + HEADER_HEIGHT}px)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {gameUrl ? (
        <iframe
          src={gameUrl}
          width={'100%'}
          height={'100%'}
          style={{ border: 'none', zIndex: 2 }}
        />
      ) : (
        <ActivityIndicator color={'$primary.200'} size={55} />
      )}
      <SolitoImage
        alt={'SABA'}
        src={require('app/assets/images/game/saba-logo.png')}
        width={241}
        height={78}
        style={{ marginBottom: '20%', position: 'absolute', zIndex: 1 }}
      />
    </Container>
  )
}
