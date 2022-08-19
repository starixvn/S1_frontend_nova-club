import useContainerDimension from 'app/hooks/useContainerDimension'
import { RootState } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert.slice'
import { Text } from 'dripsy'
import React, { useCallback, useEffect, useRef } from 'react'
import {
  ModalEventListener,
  ModalOnCloseEventCallback,
  useModal,
} from 'react-native-modalfy'
import { useDispatch, useSelector } from 'react-redux'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertModal = ({ modal: { addListener, closeModal, closeAllModals } }) => {
  const dispatch = useDispatch()
  const onCloseListener = useRef<ModalEventListener | undefined>()
  const alertList = useSelector((s: RootState) => s.alert.data)
  const alert = alertList ? alertList[0] : undefined

  const isVisible = alert != null && !alert.isDismissed

  const handleClose: ModalOnCloseEventCallback = useCallback(
    (closingAction) => {
      _onDismiss()
    },
    []
  )

  useEffect(() => {
    onCloseListener.current = addListener('onClose', handleClose)

    return () => {
      onCloseListener.current?.remove()
    }
  }, [addListener, handleClose])

  if (alert === undefined) return null
  let {
    title = 'common.importantNote',
    message,
    onDismiss,
    actions,
    persistent,
    hideCloseButton,
  } = alert

  function _onDismiss() {
    if (typeof onDismiss === 'function') onDismiss()
    else dispatch(AlertActions.dismiss())

    dispatch(AlertActions.next())
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={title}
        closeModal={closeModal}
        actions={actions}
        hideCloseButton={true}
      >
        <Text>{message}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AlertModal
