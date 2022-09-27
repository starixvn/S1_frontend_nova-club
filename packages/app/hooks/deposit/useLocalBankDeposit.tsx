import { LocalBankValues } from 'app/features/deposit/local-bank'
import useLocalization from 'app/provider/localization'
import { FormikHelpers } from 'formik'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} from 'services/deposit'
import useAlert from '../useAlert'

type useLocalBankDepositProps = {
  selectedImage: any
}

const useLocalBankDeposit = ({ selectedImage }: useLocalBankDepositProps) => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const [postSubmitManualDeposit] = useSubmitManualDepositMutation()
  const [postUploadReceipt] = useUploadDepositSlipMutation()

  const postDepositSubmit = async (
    { bank, realAmount }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      actions.setSubmitting(true)

      if (!selectedImage) return
      showAlert(t('status.receiptRequired'))

      const { data, success, message } = await postSubmitManualDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
        payment_account_id: bank?.pay_acc_id ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        await uploadSlip(data.secure_id)
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const uploadSlip = async (secureId, isToast = false) => {
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
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        isToast &&
          Toast.show({
            type: 'success',
            text1: t('status.bankSlipSuccess'),
          })
        return
      }
    } catch (error) {
      showAlert(error)
      return error
    }
  }

  return { postDepositSubmit, uploadSlip }
}

export default useLocalBankDeposit
