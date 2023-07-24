import { ModalStackParams } from 'agent/provider/agentModal'
import { useAgentLocalization } from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { styled, Text } from 'dripsy'
import React from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import Button from '../Button'
import ModalWrapper from './ModalWrapper'

type NewRegistrationModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'NewRegistrationModal'
>
const NewRegistrationModal = ({
  modal: { closeModal, getParam },
}: NewRegistrationModalProps) => {
  const { t } = useAgentLocalization()
  const SBO_LINK = 'https://sbo-stage.gball8.com/login'

  const username = getParam('username', '')
  const password = getParam('password', '')
  const textToCopy = `${t('shAgent.newNote1')}\n\n${t(
    'common.username'
  )}: ${username}\n${t('common.password')}: ${password}\n\n${t(
    'shAgent.newNote2'
  )} >>> ${SBO_LINK}\n\n${t('shAgent.newNote3')}`
  const handleCopy = () => {
    copyToClipboard(textToCopy)
  }

  return (
    <ModalWrapper title={t('shAgent.newRegis')} onClose={closeModal}>
      <StyledText>{t('shAgent.newNote1')}</StyledText>
      <StyledText sx={{ mb: 0 }}>{`${t(
        'common.username'
      )}: ${username}`}</StyledText>
      <StyledText>{`${t('common.password')}: ${password}`}</StyledText>
      <StyledText>{`${t('shAgent.newNote2')} >>> ${SBO_LINK}`}</StyledText>
      <StyledText>{t('shAgent.newNote3')}</StyledText>
      <Button onPress={handleCopy} sx={{ mt: 24 }}>
        {t('common.copy')}
      </Button>
    </ModalWrapper>
  )
}

const StyledText = styled(Text)({
  mb: 12,
  color: 'black',
})

export default NewRegistrationModal
