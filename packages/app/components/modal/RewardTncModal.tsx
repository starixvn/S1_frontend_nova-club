import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

type RewardTncModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'RewardTncModal'
>

const RewardTncModal = ({
  modal: { closeModal, getParam },
}: RewardTncModalProps) => {
  const content = getParam('content')

  const { width } = useWindowDimensions()
  const { t } = useLocalization()

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent title={t('rewards.howToPlay')} close={closeModal}>
        {content}
      </ModalContent>
    </ModalWrapper>
  )
}

export default RewardTncModal
