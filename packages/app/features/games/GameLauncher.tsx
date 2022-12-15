import { DEV_DOMAIN } from '@env'
import useAlert from 'app/hooks/useAlert'
import useLoading from 'app/hooks/useLoading'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { IResponse } from 'services/common/types'
import { useLazyGetGameUrlQuery } from 'services/gameApi'
import { GetGameUrlResult } from 'services/gameApi.type'
import useGameWindow from './useGameWindow'
import { useMaintenanceStatus } from './useMaintenanceStatus'

const ProviderRunningWithoutIframe = ['PRGP']
const GameLauncher = () => {
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const authState = useAppSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [getGameUrl] = useLazyGetGameUrlQuery()
  const { openGame, cleanUpGame } = useGameWindow()
  const { checkMaintenance } = useMaintenanceStatus()
  const { toggleLoading } = useLoading()

  const {
    providerCode,
    gameCode,
    gameName,
    desktopMode = false,
    params,
  } = gameLauncherState

  async function launchGamePT() {
    const domain = Platform.OS === 'web' ? '' : DEV_DOMAIN
    const ptLaunchUrl = `${domain}/launcher_pt?code=${gameCode}&t=${authState.info?.token}&username=${authState.info?.playerName}`

    openGame(ptLaunchUrl, true)
  }

  async function launchGame() {
    try {
      toggleLoading(true)

      const { data, success } = await getGameUrl({
        game_code: gameCode,
        is_demo: 0,
        is_mobile: desktopMode ? 0 : 1,
        platform_code: providerCode,
        home_url: DEV_DOMAIN,
        cashier_url: `${DEV_DOMAIN}/deposit`,
      })
        .unwrap()
        .catch((e: IResponse<GetGameUrlResult>) => {
          showAlert(e.message)
          return e
        })

      if (success) {
        let paramsToAppend = ''
        if (params) {
          const urlParams = new URLSearchParams(params)
          paramsToAppend = urlParams.toString()
        }

        const url = `${data?.url}&${paramsToAppend}`

        openGame(
          url,
          !!(
            providerCode && ProviderRunningWithoutIframe.includes(providerCode)
          ),
          gameName
        )
      } else cleanUpGame()
    } catch (e) {
      throw e
    } finally {
      toggleLoading(false)
    }
  }

  async function launchGameProcess() {
    dispatch(SettingActions.addRecentGame({ ...gameLauncherState }))

    try {
      if (providerCode === 'PTV2') {
        await launchGamePT()
      } else await launchGame()
    } catch (e) {
      console.log('Launch game error', e)
      cleanUpGame()
    }
  }

  /* Entry Point for launching game */
  useEffect(() => {
    if (providerCode) {
      const isMaintenance = checkMaintenance(providerCode)
      if (isMaintenance) {
        showAlert(t('game.underMaintenance'))
        cleanUpGame()
        return
      }

      launchGameProcess()
    }

    return () => {
      dispatch(GameLauncherActions.reset())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerCode])

  return null
}

export default GameLauncher
