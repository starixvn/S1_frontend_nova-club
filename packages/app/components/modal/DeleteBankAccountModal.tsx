import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useDeletePlayerBankAccMutation } from 'services/bank'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const DeleteBankAccountModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const bank = getParam('bank')
  const [postDeletePlayerBank] = useDeletePlayerBankAccMutation()

  const handleDismiss = () => {
    closeModal()
  }

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      const { data, success, message } = await postDeletePlayerBank({
        bank_acc_num: bank?.BankAccountNumber ?? '',
        bank_type_id: bank?.BankTypeId ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
      }
    } catch (e) {
      showAlert(t('status.systemError'))
    } finally {
      setIsSubmitting(false)
      handleDismiss()
    }
  }

  return (
    <ModalWrapper>
      <ModalContent
        actions={[
          {
            label: t('common.cancel'),
            onPress: handleDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onSubmit,
            loading: isSubmitting,
          },
        ]}
      >
        <View sx={{ justifyContent: 'center', flex: 1 }}>
          <Text sx={{ textAlign: 'center' }}>{t('bank.confirmDelete')}</Text>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default DeleteBankAccountModal
