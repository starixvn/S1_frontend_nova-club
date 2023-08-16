import { useAppSelector } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { useDispatch } from 'react-redux'
import { usePlayerBalanceQuery } from 'services/walletApi'

export default function useGameWindow() {
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { data, refetch } = usePlayerBalanceQuery(undefined, {
    skip: !isLoggedIn,
  })

  function _refreshWallet() {
    // When window is instantly closed and auto focused to main window, the .closed indicator will remain false until a few ms.
    setTimeout(() => {
      if (!window.gameWindow || window.gameWindow.closed) {
        window.removeEventListener('focus', _refreshWallet)
      } else refetch()
    }, 100)
  }

  function openGame(
    url: string,
    providerCode: string,
    options?: { external?: boolean; title?: string }
  ) {
    if (window?.gameWindow) {
      if (url) {
        window.gameWindow.location = url

        if (isLoggedIn) {
          window.removeEventListener('focus', _refreshWallet)
          window.addEventListener('focus', _refreshWallet)
        }

        window.gameWindow.focus()
      }
    }

    dispatch(GameLauncherActions.reset())
  }

  function cleanUpGame() {
    /* 
        Clean up opened window
        Game Window was opened upon click on GameLauncherActions.launchGame 
      */
    if (window?.gameWindow && !window.gameWindow.closed) {
      window.gameWindow.close()
      window.removeEventListener('focus', _refreshWallet)
    }

    dispatch(GameLauncherActions.reset())
  }

  return {
    openGame,
    cleanUpGame,
    isGameWindowRunning: window?.gameWindow && !window?.gameWindow.closed,
  }
}
