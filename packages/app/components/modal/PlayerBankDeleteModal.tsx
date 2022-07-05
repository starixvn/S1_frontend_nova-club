import useLocalization from 'app/provider/localization'
import { useDeletePlayerBankAccMutation } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { AlertActions } from 'app/store/alert'
import { Text, View } from 'dripsy'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'app/components/modal'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

type PlayerBankDeleteModalProps = {
  //   bank: PlayerBankResult
}

export type PlayerBankDeleteModalForwardRef = {
  showDialog: (bank: PlayerBankResult) => void
}

const PlayerBankDeleteModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

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
        .catch((result) => {
          dispatch(AlertActions.addError(result.message))
          return result
        })

      if (success) {
        dispatch(AlertActions.addSuccess(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    } finally {
      setIsSubmitting(false)
      handleDismiss()
    }
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
          {
            label: t('common.submit'),
            onPress: onSubmit,
            disableAutoClose: true,
            loading: isSubmitting,
          },
        ]}
      >
        <Text>{t('common.confirmDelete')}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default PlayerBankDeleteModal
