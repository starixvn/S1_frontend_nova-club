import { TabBarSelection } from 'app/components/navigation/CustomTabBar'
import { LoginType } from 'app/features/auth/AuthTypeSelection'
import LoginForm from 'app/features/auth/login/LoginForm'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import AuthLayout from '../AuthLayout'
import { ModalComponentProp } from 'react-native-modalfy'
import { ModalStackParams } from 'app/provider/modal'
import { View } from 'dripsy'
import { agentRoute, memberRoute } from 'app/features/auth/login/LoginScreen'

type Props = ModalComponentProp<ModalStackParams, void, 'AgentLoginModal'>

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreenDesktop({ modal }: Props) {
  const { t } = useLocalization()
  const [urlType, setUrlType] = useParam('t', { initial: LoginType.Member })
  const modalType = modal?.getParam('t', LoginType.Agent)
  const type = modalType ?? urlType

  const agentToken = useAppSelector((s) => s.agent.access_token)
  const memberToken = useAppSelector((state) => state.auth.info?.token)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])
  const [index, setIndex] = useState(0)
  const { replace } = useRouter()

  const [routes, setRoutes] = useState([memberRoute, agentRoute])

  const handlePress = (value) => {
    if (agentToken) {
      replace('/agent/profile')
    }
    setUrlType(value === 0 ? LoginType.Member : LoginType.Agent)
    setIndex(value)
  }

  useEffect(() => {
    const initT = routes.find((e) => {
      return e.type === type
    })
    if (initT) setIndex(initT.index)

    if (memberToken) setRoutes([agentRoute])
  }, [])

  return (
    <AuthLayout
      isAbleToClose={Boolean(modal)}
      sx={{ mt: modal ? 0 : '$5' }}
      isAgent={isAgentLogin}
      headerDesc={
        isAgentLogin
          ? t('authentication.loginAgentHeader')
          : t('authentication.loginHeader')
      }
    >
      <View sx={{ mt: '$3', flex: 1 }}>
        {Boolean(modal) ? null : (
          <TabBarSelection
            currentIndex={index}
            onPress={handlePress}
            routes={routes}
            buttonProps={{
              sx: {
                pb: 0,
                pt: '$4',
              },
            }}
            buttonTextProps={{
              sx: {
                py: 0,
              },
            }}
          />
        )}

        <LoginForm
          isAgent={isAgentLogin}
          isAgentLoginWithDesktopModal={Boolean(modal)}
          sx={{
            flex: 1,
          }}
        />
      </View>
    </AuthLayout>
  )
}
