import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import useLoading from 'app/hooks/useLoading'
import { useAppSelector } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { useDispatch } from 'react-redux'
import useGameWalletSummary from './useGameWalletSummary'

export default function useGameWindow() {
  const dispatch = useDispatch()
  const lastLaunchProvider = useAppSelector(
    (s) => s.gameLauncher.lastLaunchedProvider
  )

  const { refetch, isTransferRequired, isSeamless } =
    useGameWalletSummary(lastLaunchProvider)

  const [transferAllToOne] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  const { toggleLoading } = useLoading()

  async function transferAllToMain() {
    try {
      toggleLoading(true)
      await transferAllToOne({
        transfer_from: 999,
        transfer_to: 0,
      }).unwrap()
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoading(false)
    }
  }

  function _refreshWallet() {
    // When window is instantly closed and auto focused to main window, the .closed indicator will remain false until a few ms.
    setTimeout(() => {
      if (!window.gameWindow || window.gameWindow.closed) {
        window.removeEventListener('focus', _refreshWallet)
        if (!isSeamless && isTransferRequired) transferAllToMain()
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
        window.removeEventListener('focus', _refreshWallet)
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
