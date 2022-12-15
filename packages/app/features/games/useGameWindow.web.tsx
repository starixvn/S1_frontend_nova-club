import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { useDispatch } from 'react-redux'

export default function useGameWindow() {
  const dispatch = useDispatch()
  function openGame(url?: string, external?: boolean, title?: string) {
    if (window?.gameWindow) {
      if (url) window.gameWindow.location = url
      window.gameWindow.focus()
    }

    dispatch(GameLauncherActions.reset())
  }

  function cleanUpGame() {
    /* 
        Clean up opened window
        Game Window was opened upon click on GameLauncherActions.launchGame 
      */
    if (window?.gameWindow && !window.gameWindow.closed)
      window.gameWindow.close()

    dispatch(GameLauncherActions.reset())
  }

  return {
    openGame,
    cleanUpGame,
    isGameWindowRunning: window?.gameWindow && !window?.gameWindow.closed,
  }
}
