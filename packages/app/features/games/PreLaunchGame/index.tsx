import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { PLATFORM_CODE } from 'app/utils/constant'
import { View } from 'dripsy'
import { useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useLazyGetGameUrlQuery } from 'services/gameApi'
import { usePlayerBalanceQuery } from 'services/wallet'
import { useRouter } from 'solito/router'
import { sleep } from 'utils/common'
import GameAmount from './GameAmount'
import GameRewards from './GameRewards'
import TopHeader from './TopHeader'
import UserAgreement from './UserAgreement'

function useGameBalanceRule() {
  const [isBalanceReady, setBalanceReady] = useState(true)
  const [isBalanceChecked, setBalanceChecked] = useState(false)
  const [isCheckingBalance, setCheckingBalance] = useState(false)
  async function refreshWallet() {
    return sleep(2000)
  }

  async function transfer() {
    // transfer single vendor wallet to main wallet
    return sleep(2000)
  }

  async function transferAllToMain() {
    // perform transfer all to main
    // loop through each vendor wallet with money and transfer 1 by 1
    return sleep(2000)
  }

  return {
    isBalanceReady,
    isCheckingBalance,
    isBalanceChecked,
    transferAllToMain,
  }
}

function useGameLauncher() {
  const { push } = useRouter()
  const [isVerifying, setVerifying] = useState(false)
  const [getGameUrl] = useLazyGetGameUrlQuery()
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)

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
  const [agree, setAgree] = useState(false)
  const { launchGame, isVerifying } = useGameLauncher()
  const { isBalanceReady } = useGameBalanceRule()

  const { playerBalance } = usePlayerBalanceQuery()

  const { top } = useSafeArea()
  return (
    <DripsyGradient colors={['#164672', '#0D2035']} sx={{ flex: 1, pt: top }}>
      <TopHeader />
      <GameRewards />
      <UserAgreement
        onAgree={(e) => {
          setAgree(e)
        }}
        isAgree={agree}
      />
      <GameAmount playerBalance={playerBalance?.data} />
      <View sx={{ mt: '$10', mx: '$5' }}>
        <Button
          disabled={!agree || isVerifying || !isBalanceReady}
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: ['#33A0D0', '#0B76A5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={launchGame}
        >
          <Button.Label>{t('game.enterGame')}</Button.Label>
        </Button>
      </View>
    </DripsyGradient>
  )
}

export default withContextualNav(
  PreLaunchGame,
  ContextualModuleKey.PreLaunchGame
)
