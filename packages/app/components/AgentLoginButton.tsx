import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import Shadow from './Shadow'
import Button from './common/Button'
import useLocalization from 'app/provider/localization'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

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
          maxWidth: 150,
          py: '$2',
          borderRadius: 15,
        }}
        onPress={() =>
          agentToken ? push('/agent/profile') : openModal('AgentLoginModal')
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
