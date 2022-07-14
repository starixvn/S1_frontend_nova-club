import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { AlertActions } from 'app/store/alert'
import { getErrorMessage } from 'app/utils/validation'
import { View } from 'dripsy'
import { useCallback, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useLazyGetGameUrlQuery } from 'services/gameApi'
import {
  usePlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'
import { useRouter } from 'solito/router'
import GameAmount from './GameAmount'
import GameRewards from './GameRewards'
import TopHeader from './TopHeader'
import UserAgreement from './UserAgreement'

type WalletDetail = {
  isMaintenance: boolean
  id: number
  seamless: number
}

function useGameBalanceRule() {
  const [isBalanceReady, setBalanceReady] = useState(true)
  const [walletDetails, setWalletDetails] = useState<{
    [index: string]: WalletDetail
  }>()
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isTransferTriggered, setisTransferTriggered] = useState(false)

  const { data: walletDetailsRaw, isFetching } = usePlayerWalletDetailQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const [
    transferAllToOne,
    { isLoading: isTransferringToMain, isUninitialized },
  ] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  useEffect(() => {
    if (isTransferringToMain) {
      setisTransferTriggered(true)
    }
  }, [isTransferringToMain])

  useEffect(() => {
    const detailResponse = walletDetailsRaw?.data
    if (detailResponse) {
      setWalletDetails(
        Object.keys(detailResponse).reduce((acc, id) => {
          const detail = detailResponse[id]
          return {
            ...acc,
            [detail?.system_code ?? '']: {
              isMaintenance:
                (detail?.maintenance && detail.maintenance === 'true') ?? false,
              id: Number(id),
              seamless: detail?.seamless ?? 0,
            },
          }
        }, {})
      )
    }
  }, [walletDetailsRaw])

  const targetProvider = useAppSelector((s) => s.gameLauncher.providerCode)

  const balanceQuery = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: !isTransferringToMain && !isTransferTriggered, // if transferAllToOne is fetching, playerBalance cannot be called
  })

  const {
    data: playerBalance,
    isLoading,
    isFetching: isCheckingBalance,
    refetch,
  } = balanceQuery

  async function transferToGame() {
    // transfer single vendor wallet to main wallet
    try {
      if (playerBalance?.data?.main.balance != null && walletDetails) {
        const isSeamless = walletDetails[targetProvider ?? '']?.seamless

        if (!isSeamless) {
          await transferAllToOne({
            transfer_from: 0,
            transfer_to: walletDetails[targetProvider ?? '']?.id ?? 0,
          }).unwrap()
        }
      }
    } catch (error) {
      throw error
    }
  }

  async function transferAllToMain() {
    try {
      await transferAllToOne({
        transfer_from: 999,
        transfer_to: 0,
      }).unwrap()
    } catch (error) {
      throw error
    }
  }

  const checkIsGameRunning = useCallback(() => {
    const walletBalance = playerBalance?.data

    if (!walletBalance) return false

    const { main, ...vendorWallets } = walletBalance
    const MAIN_WALLET_KEY = 'main'
    const vendorWalletKeyLists = Object.keys(vendorWallets).filter(
      (wallet) => wallet !== MAIN_WALLET_KEY
    )

    if (!vendorWalletKeyLists.length) return false

    for (const vendorWalletKey of vendorWalletKeyLists) {
      const balance = vendorWallets[vendorWalletKey]?.balance

      if (balance && Number(balance) > 0) return true
    }

    return false
  }, [playerBalance?.data])

  useEffect(() => {
    if (playerBalance?.data) {
      setIsGameRunning(checkIsGameRunning())
    }
  }, [checkIsGameRunning, playerBalance?.data])

  const isTargetProviderMaintenance =
    walletDetails && targetProvider
      ? walletDetails[targetProvider]?.isMaintenance
      : false

  return {
    // Ready when done translfer all
    refreshWallet: refetch,
    isWalletDetailsAvailable: !!walletDetails,
    isBalanceReady,
    isCheckingBalance,
    isGameMaintenance: isTargetProviderMaintenance,
    isGameRunning,
    isTransferringToMain,
    transferAllToMain,
    transferToGame,
    playerBalance: playerBalance?.data,
  }
}

const ProviderRunningWithoutIframe = ['PRGP']
function useGameLauncher(gameLauncherState) {
  const { push, back } = useRouter()
  const [isVerifying, setVerifying] = useState(false)
  const [getGameUrl] = useLazyGetGameUrlQuery()

  const {
    providerCode,
    gameCode,
    gameName,
    desktopMode = false,
  } = gameLauncherState

  async function launchGame() {
    try {
      setVerifying(true)
      const { data } = await getGameUrl({
        game_code: gameCode,
        is_demo: 0,
        is_mobile: desktopMode ? 0 : 1,
        platform_code: providerCode,
      }).unwrap()

      const url = data?.url

      if (url) {
        if (
          Platform.OS === 'web' ||
          ProviderRunningWithoutIframe.includes(providerCode)
        ) {
          Linking.openURL(url)
        } else {
          push({
            pathname: '/games/gameUrl',
            query: {
              gameUrl: encodeURIComponent(url),
              title: gameName,
            },
          })
        }
      }
    } catch (e) {
      throw e
    } finally {
      setVerifying(false)
    }
  }

  return {
    isVerifying,
    launchGame,
    back,
  }
}

const PreLaunchGame = ({}) => {
  const { t } = useLocalization()
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)
  const [agree, setAgree] = useState(false)
  const [isLaunchingGame, setIsLaunchingGame] = useState(false)
  const [isGameStateEmpty, setIsGameStateEmpty] = useState(false)
  const dispatch = useAppDispatch()

  const { launchGame, isVerifying, back } = useGameLauncher(gameLauncherState)
  const {
    isWalletDetailsAvailable,
    refreshWallet,
    isGameMaintenance,
    isBalanceReady,
    isCheckingBalance,
    isTransferringToMain,
    playerBalance,
    isGameRunning,
    transferAllToMain,
    transferToGame,
  } = useGameBalanceRule()

  const { top } = useSafeArea()
  const { providerCode } = gameLauncherState
  const isSaba = providerCode === 'SABA'

  async function onLauchGame() {
    setIsLaunchingGame(true)

    try {
      await transferToGame()
      await launchGame()
    } catch (error) {
      console.error(error)
      const errorMessage = getErrorMessage(error)
      dispatch(
        AlertActions.addError({
          message: errorMessage,
        })
      )
    } finally {
      setIsLaunchingGame(false)
    }
  }
  async function quitGame() {
    try {
      await transferAllToMain()
    } catch (error) {
      console.error(error)
      const errorMessage = getErrorMessage(error)
      dispatch(
        AlertActions.addError({
          message: errorMessage,
        })
      )
    }
  }

  const label = isGameMaintenance
    ? t('game.underMaintenance')
    : isGameRunning
    ? t('game.quitGame')
    : t('game.enterGame')

  const checkIfGameLauncherStateExist = () => {
    const gameLauncherStateKeys = Object.keys(gameLauncherState)

    return Boolean(gameLauncherStateKeys.length)
  }

  useEffect(() => {
    const isGameStateExist = checkIfGameLauncherStateExist()
    setIsGameStateEmpty(isGameStateExist)
    if (!isGameStateExist) back()
  }, [])

  if (!isGameStateEmpty) {
    return null
  }

  return (
    <DripsyGradient colors={['#164672', '#0D2035']} sx={{ flex: 1, pt: top }}>
      <TopHeader />
      <GameRewards />
      {isSaba && (
        <UserAgreement
          onAgree={(e) => {
            setAgree(e)
          }}
          isAgree={agree}
        />
      )}
      <GameAmount playerBalance={playerBalance} />
      <View sx={{ mt: '$10', mx: '$5' }}>
        <Button
          loading={
            isCheckingBalance ||
            isTransferringToMain ||
            !isWalletDetailsAvailable ||
            isLaunchingGame
          }
          disabled={
            (isSaba && !agree) ||
            isVerifying ||
            !isBalanceReady ||
            isGameMaintenance
          }
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: ['#33A0D0', '#0B76A5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={isGameRunning ? quitGame : onLauchGame}
        >
          <Button.Label sx={{ fontSize: [15, 16] }}>{label}</Button.Label>
        </Button>
      </View>
    </DripsyGradient>
  )
}

export default withContextualNav(
  PreLaunchGame,
  ContextualModuleKey.PreLaunchGame
)
