// import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  GotoGameResult,
  LaunchGameType,
  LaunchGameWithHTML,
  LaunchGameWithUrl,
} from 'services/gameApi.type'
import { useRouter } from 'solito/router'

export interface OpenGameOptions {
  launchGameMethod: GotoGameResult
  providerCode: string
  external?: boolean
  title?: string
}

export default function useGameWindow() {
  const dispatch = useDispatch()
  const { push } = useRouter()

  function openGame({
    launchGameMethod,
    providerCode,
    external = false,
    title = '',
  }: OpenGameOptions) {
    if (launchGameMethod.launchGameType === LaunchGameType.HTML) {
      const { html } = launchGameMethod
      push({
        pathname: '/launcher',
        query: {
          html: encodeURIComponent(html),
          title,
          providerCode,
        },
      })
    } else {
      const { url } = launchGameMethod
      if (external) {
        Linking.openURL(url)
      } else {
        push({
          pathname: '/launcher',
          query: {
            url: encodeURIComponent(url),
            title,
            providerCode,
          },
        })
      }
    }
  }

  function cleanUpGame() {
    dispatch(GameLauncherActions.reset())
  }

  return {
    openGame,
    cleanUpGame,
    isGameWindowRunning: window?.gameWindow && !window?.gameWindow.closed,
  }
}
