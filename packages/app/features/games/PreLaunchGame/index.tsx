import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import { transferAllToMainWallet } from 'app/custom_services/walletApi'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { AlertActions } from 'app/store/alert'
import { PLATFORM_CODE, WALLET } from 'app/utils/constant'
import { getErrorMessage } from 'app/utils/validation'
import { ActivityIndicator, View } from 'dripsy'
import { useCallback, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useLazyGetGameUrlQuery } from 'services/gameApi'
import {
  usePlayerBalanceQuery,
  usePlayerWalletDetailQuery,
  useTransferMutation,
} from 'services/wallet'
import { useRouter } from 'solito/router'
import { sleep } from 'utils/common'
import GameAmount from './GameAmount'
import GameRewards from './GameRewards'
import TopHeader from './TopHeader'
import UserAgreement from './UserAgreement'

const enum ERROR {
  SYSTEM_ERROR = -999,
}

type WalletDetail = {
  isMaintenance: boolean
  id: number
}

function useGameBalanceRule() {
  const [isBalanceReady, setBalanceReady] = useState(true)
  const [walletDetails, setWalletDetails] =
    useState<{ [index: string]: WalletDetail }>()
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isTransferringToMain, setIsTransferringToMain] = useState(false)
  const [transfer] = useTransferMutation()

  const { data: walletDetailsRaw, isFetching } = usePlayerWalletDetailQuery()

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
            },
          }
        }, {})
      )
    }
  }, [walletDetailsRaw])

  const targetProvider = useAppSelector((s) => s.gameLauncher.providerCode)

  const balanceQuery = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const {
    data: playerBalance,
    isLoading,
    isFetching: isCheckingBalance,
    refetch,
  } = balanceQuery

  async function transferToGame() {
    // transfer single vendor wallet to main wallet
    if (playerBalance?.data?.main.balance != null) {
      return transfer({
        amount: Number(playerBalance?.data?.main.balance),
        transfer_from: 0,
        transfer_to: walletDetails
          ? walletDetails[targetProvider ?? '']?.id ?? 0
          : 0,
      })
    }
  }

  async function transferAllToMain() {
    try {
      setIsTransferringToMain(true)
      const response = await transferAllToMainWallet(playerBalance?.data)
      console.log('response, response', response)
      /* for now we assume all success first */
      for (const result of response) {
        if (result) {
          if (result.error?.code === ERROR.SYSTEM_ERROR) {
            return {
              isSuccess: false,
              errorMessage: result.error?.message,
            }
          }
        }
      }

      return {
        isSuccess: true,
        errorMessage: '',
      }
    } catch (error) {
      console.log('err', error)
      return {
        isSuccess: false,
        errorMessage: getErrorMessage(error),
      }
    } finally {
      setIsTransferringToMain(false)
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

  console.log('isTargetProviderMaintenance', isTargetProviderMaintenance)
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

function useGameLauncher(gameLauncherState) {
  const { push } = useRouter()
  const [isVerifying, setVerifying] = useState(false)
  const [getGameUrl] = useLazyGetGameUrlQuery()

  const { providerCode, gameCode, gameName } = gameLauncherState

  async function launchGame() {
    try {
      setVerifying(true)
      const { data } = await getGameUrl({
        game_code: gameCode,
        is_demo: 0,
        is_mobile:
          Platform.OS === 'web' ? PLATFORM_CODE.WEB : PLATFORM_CODE.APP,
        platform_code: providerCode,
      })
      const url = data?.data?.url

      if (url) {
        if (Platform.OS === 'web') {
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
    } finally {
      setVerifying(false)
    }
  }

  return {
    isVerifying,
    launchGame,
  }
}

const PreLaunchGame = ({}) => {
  const { t } = useLocalization()
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)
  const [agree, setAgree] = useState(false)
  const dispatch = useAppDispatch()

  const { launchGame, isVerifying } = useGameLauncher(gameLauncherState)
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
    // try to transfer to target wallet
    // const resp = await transferToGame()

    launchGame()
  }
  async function quitGame() {
    const { isSuccess, errorMessage } = await transferAllToMain()

    if (isSuccess) {
      refreshWallet()
    } else {
      dispatch(AlertActions.addError(errorMessage))
    }
  }

  const label = isGameMaintenance
    ? t('game.underMaintenance')
    : isGameRunning
    ? t('game.quitGame')
    : t('game.enterGame')

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
            !isWalletDetailsAvailable
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
          <Button.Label>{label}</Button.Label>
        </Button>
      </View>
    </DripsyGradient>
  )
}

export default withContextualNav(
  PreLaunchGame,
  ContextualModuleKey.PreLaunchGame
)
