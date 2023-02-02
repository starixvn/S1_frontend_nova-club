import { ModalStackParams } from 'agent/provider/agentModal'
import { useAgentTranslation } from 'app/provider/localization'
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
  const { t } = useAgentTranslation()
  const SBO_LINK = 'https://sbo-stage.gball8.com/login'

  const username = getParam('username', '')
  const password = getParam('password', '')

  const handleCopy = () => {
    copyToClipboard(SBO_LINK)
  }

  return (
    <ModalWrapper title="New Registration Info" onClose={closeModal}>
      <StyledText>{`Hi, \nThis is your account information`}</StyledText>
      <Text>{`Username: ${username}`}</Text>
      <StyledText>{`Password: ${password}`}</StyledText>
      <Text>{`Visit the page >>> ${SBO_LINK} \nPlease change your password upon next login Have a great day!`}</Text>
      <Button onPress={handleCopy} sx={{ mt: 24 }}>
        {t('common.copy')}
      </Button>
    </ModalWrapper>
  )
}

const StyledText = styled(Text)({
  mb: 12,
})

export default NewRegistrationModal
