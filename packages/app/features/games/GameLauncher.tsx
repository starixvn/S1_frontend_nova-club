import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useAppSelector } from 'app/provider/redux/store'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'

const GameLauncher = () => {
  const gameLauncherState = useAppSelector((s) => s.gameLauncher)

  const { push } = useRouter()

  const { providerCode, context = ContextualModuleKey.Home } = gameLauncherState

  const { makeContextualHref } = useContextualRouting(context)
  const prelaunchUri = '/games/prelaunch'
  const to = makeContextualHref(prelaunchUri)

  useEffect(() => {
    if (providerCode) {
      push(to, prelaunchUri)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerCode])

  return null
}

export default GameLauncher
