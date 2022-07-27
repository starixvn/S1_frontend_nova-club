import { RootState } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert'
import { Text } from 'dripsy'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '.'
import ModalContent from './ModalContent'

// const AlertModal = ({ modal: { closeModal, getParam } }) => {
const AlertModal = () => {
  const dispatch = useDispatch()

  const alertList = useSelector((s: RootState) => s.alert.data)
  const alert = alertList ? alertList[0] : undefined

  const isVisible = alert != null && !alert.isDismissed

  if (alert === undefined) return null
  let {
    title = 'ImportantNote',
    message,
    onDismiss,
    actions,
    persistent,
    hideCloseButton,
  } = alert

  function _onDismiss() {
    if (typeof onDismiss === 'function') onDismiss()
    else dispatch(AlertActions.dismiss())

    setTimeout(() => {
      dispatch(AlertActions.next())
    }, 200)
  }

  return (
    <Modal
      isVisible={isVisible}
      hideCloseButton={hideCloseButton}
      title={title}
      onModalHide={_onDismiss}
      onBackdropPress={_onDismiss}
      actions={actions}
    >
      <Text>{message}</Text>
    </Modal>
  )
  // return(
  //   <ModalContent
  //     title={title}
  //     closeModal={closeModal}
  //     actions={[
  //       {
  //         label: t('common.cancel'),
  //         onPress: onDismiss,
  //       },
  //       {
  //         label: t('common.submit'),
  //         onPress: onDepositConfirmed,
  //       },
  //     ]}
  //   >
  //     <Text>{t('deposit.pleaseConfirmDeposit')}</Text>

  //     <Text>
  //       {`${t('deposit.depositAmount')} : ${toCurrency(amount, currency, {
  //         hideTruncatedThousand: false,
  //         forceDecimal: false,
  //       })}`}
  //     </Text>
  //   </ModalContent>
  // )
}

export default AlertModal
