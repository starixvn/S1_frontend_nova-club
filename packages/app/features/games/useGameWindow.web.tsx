import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'

export default function useGameWindow() {
  const dispatch = useDispatch()
  const [refreshWallet] = useLazyPlayerBalanceQuery()

  function _refreshWallet() {
    if (!window.gameWindow || window.gameWindow.closed) {
      window.removeEventListener('focus', _refreshWallet)
    }

    refreshWallet()
  }

  function openGame(
    url: string,
    providerCode: string,
    options?: { external?: boolean; title?: string }
  ) {
    if (window?.gameWindow) {
      if (url) {
        window.gameWindow.location = url
        window.addEventListener('focus', _refreshWallet)
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
