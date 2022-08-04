import { FilePickerForwardRef } from 'app/components/FilePicker'
import { LocalBankValues } from 'app/features/deposit/local-bank'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { FormikHelpers } from 'formik'
import React, { RefObject, useRef } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} from 'services/deposit'

type useLocalBankDepositProps = {
  selectedImage: any
}

const useLocalBankDeposit = ({ selectedImage }: useLocalBankDepositProps) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [postSubmitManualDeposit] = useSubmitManualDepositMutation()
  const [postUploadReceipt] = useUploadDepositSlipMutation()

  const postDepositSubmit = async (
    { bank, realAmount }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      actions.setSubmitting(true)

      if (!selectedImage)
        return dispatch(AlertActions.addError(t('status.receiptRequired')))

      const { data, success, message } = await postSubmitManualDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
        payment_account_id: bank?.pay_acc_id ?? 0,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      console.log(
        '🚀 ~ file: index.tsx ~ line 89 ~ LocalBankScreen ~ data',
        data
      )
      if (success) {
        await uploadSlip(data.secure_id)
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    } finally {
      actions.setSubmitting(false)
    }
  }

  const uploadSlip = async (secureId) => {
    try {
      const { data, success, message } = await postUploadReceipt({
        secure_id: secureId,
        file:
          Platform.OS === 'web'
            ? selectedImage
            : {
                uri: Platform.OS === 'ios' ? selectedImage : selectedImage,
                name: selectedImage.split('/').pop() ?? '',
                type: `image/${selectedImage.split('.').pop()}` ?? '',
              },
      })
        .unwrap()
        .catch(({ message }) => dispatch(AlertActions.addError(message)))

      if (success) {
        // dispatch(AlertActions.addSuccess(message))
        return
      }
    } catch (e) {
      return dispatch(AlertActions.addError('status.systemError'))
    }
  }

  return [postDepositSubmit]
}

export default useLocalBankDeposit
