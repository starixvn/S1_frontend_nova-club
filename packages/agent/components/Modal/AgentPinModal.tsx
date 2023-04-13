import AgentUnderlinePinField from 'agent/features/pin/AgentUnderlinePinField'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import { ModalStackParams } from 'agent/provider/agentModal'
import { useAgentVerifyTransferPinMutation } from 'agent/services/agentApi'
import { AgentVerifyTransferPinResult } from 'agent/services/agentApi.type'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useShareholderVerifyTransferPinMutation } from 'agent/services/shareholderApi'
import { ShareholderVerifyTransferPinResult } from 'agent/services/shareholderApi.type'
import validation from 'agent/utils/validation'
import { useAgentLocalization } from 'app/provider/localization'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

type PinFormValues = {
  pin: string
}

interface AgentPinModalProps {
  modal: ModalType
}

interface ModalType {
  closeModal: () => void
  getParam: () => void
}

const AgentPinModal = ({ modal: { closeModal, getParam } }) => {
  const isAgent = getParam('isAgent', false)
  const onConfirm = getParam('onConfirm')
  const { t } = useAgentLocalization()
  const { showAlert } = useAgentAlert()
  const [agentVerifyPin] = useAgentVerifyTransferPinMutation()
  const [shareholderVerifyPin] = useShareholderVerifyTransferPinMutation()

  const verifyPin = isAgent ? agentVerifyPin : shareholderVerifyPin

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    onDismiss()
    setTimeout(() => {
      onConfirm && onConfirm()
    }, 500)
  }
  const onSubmit = async (
    { pin }: PinFormValues,
    actions: FormikHelpers<PinFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { success, message, result } = await verifyPin({
        pin,
      })
        .unwrap()
        .catch(
          (
            error
          ): IResponse<
            AgentVerifyTransferPinResult | ShareholderVerifyTransferPinResult
          > => {
            showAlert(error)
            return error
          }
        )
      console.log('result', result)
      if (success) {
        onWithdrawalConfirmed()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<PinFormValues>({
    initialValues: {
      pin: '',
    },
    validationSchema: Yup.object({
      pin: validation.pin,
    }),
    onSubmit,
  })

  const {
    handleChange,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    submitForm,
  } = formik

  return (
    <ModalWrapper title={t('pin.pinConfirmation')} onClose={closeModal}>
      <ModalContent
        _body={{ sx: { padding: '$2' } }}
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: submitForm,
          },
        ]}
      >
        <View sx={{ py: '$5' }}>
          <AgentUnderlinePinField
            title={t('placeholder.enterPin')}
            value={values.pin}
            setValue={handleChange('pin')}
          />
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AgentPinModal
