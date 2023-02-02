import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'

export default function useGameWindow() {
  const dispatch = useDispatch()
  const { push } = useContextualRouter()

  function openGame(
    url: string,
    providerCode: string,
    options?: { external?: boolean; title?: string }
  ) {
    const { external = false, title = '' } = options || {}
    if (external) {
      Linking.openURL(url)
    } else {
      push('/games/gameUrl', {
        gameUrl: encodeURIComponent(url),
        title: options?.title,
        providerCode,
      })
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
