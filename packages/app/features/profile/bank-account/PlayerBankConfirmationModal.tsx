import Modal from 'app/components/modal'
import useLocalization from 'app/provider/localization'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import { useDeletePlayerBankAccMutation } from 'app/services/bank'
import { PlayerBankArgs, PlayerBankResult } from 'app/services/bank.type'
import { AlertActions } from 'app/store/alert'
import { Text } from 'dripsy'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type PlayerBankDeleteModalProps = {
  //   bank: PlayerBankResult
}

export type PlayerBankDeleteModalForwardRef = {
  showDialog: (bank: PlayerBankResult) => void
}

const PlayerBankDeleteModal = forwardRef<
  PlayerBankDeleteModalForwardRef,
  PlayerBankDeleteModalProps
>(({}, ref) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bank, setBank] = useState<PlayerBankResult>()
  const [postDeletePlayerBank] = useDeletePlayerBankAccMutation()

  const handleDismiss = () => {
    setIsVisible(false)
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

  useImperativeHandle(ref, () => ({
    showDialog(bank) {
      setBank(bank)
      setIsVisible(true)
    },
  }))

  return (
    <Modal
      isVisible={isVisible}
      title={t('common.importantNote')}
      onModalHide={handleDismiss}
      onBackdropPress={handleDismiss}
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
    </Modal>
  )
})

PlayerBankDeleteModal.displayName = 'PlayerBankDeleteModal'

export default PlayerBankDeleteModal
