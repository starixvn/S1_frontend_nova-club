import { useNavigation } from '@react-navigation/native'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

export default function useGameWindow() {
  const dispatch = useDispatch()
  const { push } = useRouter()

  function openGame(
    url: string,
    providerCode: string,
    options?: { external?: boolean; title?: string }
  ) {
    const { external = false, title = '' } = options || {}
    if (external) {
      Linking.openURL(url)
    } else
      push({
        pathname: '/games/gameUrl',
        query: {
          gameUrl: encodeURIComponent(url),
          title: options?.title,
          providerCode,
        },
      })
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
