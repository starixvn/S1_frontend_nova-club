import { DEV_DOMAIN } from '@env'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { ActivityIndicator, Container } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { IResponse } from 'services/common/types'
import { useGoToGameMutation } from 'services/gameApi'
import { GetGameUrlResult } from 'services/gameApi.type'

type Props = {}

export default function SabaScreen({}: Props) {
  const [goToGame] = useGoToGameMutation()
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | undefined>()
  const [gameUrl, setGameUrl] = useState<string | undefined>()

  const authState = useAppSelector((s) => s.auth)
  const isLoggedIn = !!authState.info

  async function getSabaGame() {
    const { data, success } = await goToGame({
      game_code: '1',
      is_demo: isLoggedIn ? 0 : 1,
      is_mobile: 0,
      platform_code: 'SABA',
      home_url: DEV_DOMAIN,
      cashier_url: `${DEV_DOMAIN}/deposit`,
    })
      .unwrap()
      .catch((e: IResponse<GetGameUrlResult>) => {
        setError(e.message)
        return e
      })

    if (success && data) {
      let url = data.url
      setGameUrl(url)
    }
  }

  useEffect(() => {
    getSabaGame()
  }, [])

  return (
    <Container
      sx={{
        height: `calc(100vh - ${NAVIGATION_HEIGHT + HEADER_HEIGHT}px)`,
        justifyContent: 'center',
      }}
    >
      {gameUrl ? (
        <iframe
          src={gameUrl}
          width={'100%'}
          height={'100%'}
          style={{ border: 'none' }}
        />
      ) : (
        <ActivityIndicator color={'$secondary.500'} size={55} />
      )}
    </Container>
  )
}
