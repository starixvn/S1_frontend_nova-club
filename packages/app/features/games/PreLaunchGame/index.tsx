import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useGetGameUrlQuery } from 'app/services/gameApi'
import { PLATFORM_CODE } from 'app/utils/constant'
import { View } from 'dripsy'
import { useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useRouter } from 'solito/router'
import GameAmount from './GameAmount'
import GameRewards from './GameRewards'
import TopHeader from './TopHeader'
import UserAgreement from './UserAgreement'

const PreLaunchGame = () => {
  const { push } = useRouter()
  const { t } = useLocalization()

  const isWeb = Platform.OS === 'web'
  const getPlatform = isWeb ? PLATFORM_CODE.WEB : PLATFORM_CODE.APP
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isError, isSuccess } = useGetGameUrlQuery({
    game_code: 'sports',
    is_demo: 0,
    is_mobile: getPlatform,
    platform_code: 'SABA',
    username: user && user.firstName,
  })
  const getUrl = isSuccess && data.data && data.data.url
  const url = getUrl && encodeURIComponent(getUrl)
  const [agree, setAgree] = useState(false)

  const startGame = () => {
    if (!url) return null
    if (Platform.OS === 'web' && url) {
      Linking.openURL(getUrl)
    } else {
      push({
        pathname: '/games/gameUrl',
        query: {
          gameUrl: url,
        },
      })
    }
  }

  return (
    <DripsyGradient colors={['#164672', '#0D2035']} sx={{ flex: 1 }}>
      <TopHeader />
      <GameRewards />
      <UserAgreement
        onAgree={(e) => {
          setAgree(e)
        }}
        isAgree={agree}
      />
      <GameAmount />
      <View sx={{ mt: '$10', mx: '$5' }}>
        <Button
          disabled={!agree}
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: ['#33A0D0', '#0B76A5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={startGame}
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
