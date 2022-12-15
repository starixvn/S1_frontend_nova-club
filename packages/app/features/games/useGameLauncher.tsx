import { DEV_DOMAIN } from '@env'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { useLazyGetGameUrlQuery } from 'services/gameApi'
import { useRouter } from 'solito/router'
import useGameWindow from './useGameWindow'
import { useMaintenanceStatus } from './useMaintenanceStatus'

const ProviderRunningWithoutIframe = ['PRGP']
export function useGameLauncher() {
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const authState = useAppSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [getGameUrl] = useLazyGetGameUrlQuery()
  const { openGame, closeGame } = useGameWindow()
  const { checkMaintenance } = useMaintenanceStatus()

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
    const { data } = await getGameUrl({
      game_code: gameCode,
      is_demo: 0,
      is_mobile: desktopMode ? 0 : 1,
      platform_code: providerCode,
      home_url: DEV_DOMAIN,
      cashier_url: `${DEV_DOMAIN}/deposit`,
    }).unwrap()

    let paramsToAppend = ''
    if (params) {
      const urlParams = new URLSearchParams(params)
      paramsToAppend = urlParams.toString()
    }

    const url = `${data?.url}&${paramsToAppend}`

    openGame(
      url,
      !!(providerCode && ProviderRunningWithoutIframe.includes(providerCode)),
      gameName
    )
  }

  async function launchGameProcess() {
    dispatch(SettingActions.addRecentGame({ ...gameLauncherState }))

    try {
      if (providerCode === 'PTV2') {
        await launchGamePT()
      } else await launchGame()
    } catch (e) {
      /* 
        Clean up opened window
        Game Window was opened upon click on GameLauncherActions.launchGame 
      */
      closeGame()
    }
  }

  return {
    launchGameProcess,
  }
}
