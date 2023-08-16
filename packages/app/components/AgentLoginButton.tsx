import { LoginType } from 'app/features/auth/AuthLayout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import Shadow from './Shadow'
import Button from './common/Button'

const AgentLoginButton = () => {
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const { t } = useLocalization()
  const { openModal } = useModal()
  const { push } = useRouter()

  return (
    <Shadow
      offset={[0, -1]}
      startColor={'rgba(255, 255, 255, 0.8)'}
      distance={1}
      style={{ borderRadius: 15 }}
      containerStyle={{ marginHorizontal: 5 }}
    >
      <Button
        sx={{
          bg: '$primary.100',
          px: '$2',
          minWidth: 120,
          py: 6,
          borderRadius: 15,
        }}
        onPress={() =>
          agentToken
            ? push('/agent/profile')
            : openModal('AgentLoginModal', {
                t: LoginType.Agent,
              })
        }
        contentProps={{ sx: { py: 2 } }}
        titleProps={{
          sx: {
            fontSize: 11,
            wordWrap: 'break-word',
          },
        }}
      >
        {t('common.agentLogin')}
      </Button>
    </Shadow>
  )
}

export default AgentLoginButton
