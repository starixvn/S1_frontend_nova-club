import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const PredictionModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const handleDismiss = () => {
    closeModal()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('common.importantNote')}
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: handleDismiss,
          },
        ]}
      >
        <Text>{`Prediction`}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default PredictionModal
