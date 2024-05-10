import { ROOT_DOMAIN } from 'utils/constant/domain'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLoading from 'app/hooks/useLoading'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  GameLauncherActions,
  LaunchGamePayload,
} from 'app/store/gameLauncher.slice'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { IResponse } from 'services/common/types'
import { useGoToGameMutation } from 'services/gameApi'
import { GotoGameResult, LaunchGameType } from 'services/gameApi.type'
import { useRouter } from 'solito/router'
import useGameWindow from './useGameWindow'
import { useMaintenanceStatus } from './useMaintenanceStatus'

// const ProviderRunningWithoutIframe = ['PRGP']
const ProviderRunningWithoutIframe: string[] = []
const ProviderRunningWithoutIframePlatformBased: string[] = Platform.select({
  // android: ['SKYW'],
  android: [],
  default: [],
})

export let LaunchGame: (payload: LaunchGamePayload) => void

function paramsToQuery(params) {
  const urlParams = new URLSearchParams(params)
  const paramsToAppend = urlParams.toString()
  return `&${paramsToAppend}`
}

const GameLauncher = () => {
  const locale = useAppSelector((s) => s.setting.locale)
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const authState = useAppSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [goToGame] = useGoToGameMutation()
  const { openGame, cleanUpGame } = useGameWindow()
  const { checkMaintenance } = useMaintenanceStatus()
  const { toggleLoading } = useLoading()
  const { push, replace } = useRouter()
  const isDesktop = useIsDesktop()
  const { openModal } = useModal()

  const isLoggedIn = !!authState.info

  const { gpc, gc, name, desktopMode = false, params } = gameLauncherState

  useEffect(() => {
    LaunchGame = (payload: LaunchGamePayload) => {
      const isSabaDesktopMode = !!(
        payload.gpc === 'SABA' &&
        payload.desktopMode &&
        payload.gc === '1' &&
        isDesktop
      )

      if (isSabaDesktopMode) {
        if (checkMaintenance('SABA')) {
          showAlert(t('game.underMaintenance'))
          return
        }

        dispatch(SettingActions.addRecentGame(payload))
        let url = '/sportsbook/saba'
        if (payload.params) url += `?${paramsToQuery(payload.params)}`

        push(url)
        return
      }

      if (isLoggedIn) {
        dispatch(GameLauncherActions.launchGame(payload))
      } else isDesktop ? showAlert(t('game.err.notLogin')) : push('/auth/login')
    }
  }, [dispatch, isLoggedIn, push, replace, isDesktop, openModal, showAlert])

  async function launchGamePT(providerCode: string) {
    const domain = Platform.OS === 'web' ? '' : ROOT_DOMAIN
    const ptLaunchUrl = `${domain}/launcher_pt?code=${gc}&t=${authState.info?.token}&username=${authState.info?.playerName}`

    openGame(ptLaunchUrl, providerCode, { external: true })
  }

  async function launchGame(providerCode: string) {
    try {
      toggleLoading(true)

      const { data, success } = await goToGame({
        game_code: gc,
        is_demo: 0,
        is_mobile: desktopMode ? 0 : 1,
        platform_code: providerCode,
        home_url: ROOT_DOMAIN,
        cashier_url: `${ROOT_DOMAIN}/deposit`,
      })
        .unwrap()
        .catch((e: IResponse<GotoGameResult>) => {
          console.log('error')
          setTimeout(() => {
            showAlert(e.message)
          }, 1000)
          return e
        })

      if (success && data) {
        let launchGameMethod: GotoGameResult = data
        if (data.launchGameType === LaunchGameType.URL) {
          let url = data.url.replace(' ', '')
          if (params) {
            url += paramsToQuery(params)
          }

          launchGameMethod = {
            ...data,
            url,
          }
        }

        openGame({
          launchGameMethod,
          providerCode,
          title: name?.[locale] ?? '',
          external: !!(
            providerCode &&
            (ProviderRunningWithoutIframe.includes(providerCode) ||
              ProviderRunningWithoutIframePlatformBased.includes(providerCode))
          ),
        })
      } else cleanUpGame()
    } catch (e) {
      throw e
    } finally {
      toggleLoading(false)
    }
  }

  async function launchGameProcess(providerCode: string) {
    dispatch(SettingActions.addRecentGame({ ...gameLauncherState }))

    try {
      if (providerCode === 'PTV2') {
        await launchGamePT(providerCode)
      } else await launchGame(providerCode)
    } catch (e) {
      console.log('Launch game error', e)
      cleanUpGame()
    }
  }

  /* Entry Point for launching game */
  useEffect(() => {
    if (gpc) {
      const isMaintenance = checkMaintenance(gpc.toUpperCase())
      if (isMaintenance) {
        showAlert(t('game.underMaintenance'))
        cleanUpGame()
        return
      }

      launchGameProcess(gpc)
    }

    return () => {
      dispatch(GameLauncherActions.reset())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpc])

  return null
}

export default GameLauncher
