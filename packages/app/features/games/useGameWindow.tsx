import { useNavigation } from '@react-navigation/native'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

export default function useGameWindow() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { push } = useRouter()

  function openGame(url?: string, external?: boolean, title?: string) {
    if (url) {
      if (external) {
        Linking.openURL(url)
      } else {
        push({
          pathname: '/games/gameUrl',
          query: {
            gameUrl: encodeURIComponent(url),
            title,
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
