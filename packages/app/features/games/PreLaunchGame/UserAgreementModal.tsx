import { StyleSheet, Text, View } from 'dripsy'
import React from 'react'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import ModalContent from 'app/components/modal/ModalContent'
import useLocalization from 'app/provider/localization'

const UserAgreementModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  return (
    <ModalWrapper>
      <ModalContent
        title={t('common.userAgreement')}
        closeModal={closeModal}
        headerStyle={{
          textTransform: 'capitalize',
        }}
      >
        <Text sx={{ color: '$text' }}>{t('userAgreement.description')}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default UserAgreementModal
