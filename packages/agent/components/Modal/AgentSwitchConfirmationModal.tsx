import { useAgentLocalization } from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AgentSwitchConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()

  const onConfirm = getParam('onConfirm')

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    onDismiss()
    setTimeout(() => {
      onConfirm && onConfirm()
    }, 150)
  }

  return (
    <ModalWrapper title={t('common.importantNote')} onClose={onDismiss}>
      <ModalContent
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onWithdrawalConfirmed,
          },
        ]}
      >
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Text sx={{ color: 'black', textAlign: 'center' }}>
            {t('menu.switchMemberNote')}
          </Text>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AgentSwitchConfirmationModal
