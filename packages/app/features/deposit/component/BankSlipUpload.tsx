import FilePicker, { FilePickerProps } from 'app/components/form/FilePicker'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import ImagePicker, { ImagePickerAsset } from 'expo-image-picker'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useUploadDepositSlipMutation } from 'services/deposit'

type BankSlipUploadProps = FilePickerProps & {}

export interface BankSlipUploadMethod {
  uploadBankSlip: (secureId: string) => void
}

const BankSlipUpload = forwardRef<BankSlipUploadMethod, BankSlipUploadProps>(
  (props: BankSlipUploadProps, ref) => {
    const { t } = useLocalization()
    const { showAlert } = useAlert()

    const [postUploadReceipt] = useUploadDepositSlipMutation()

    const uploadBankSlip = async (secureId) => {
      try {
        let file
        const receipt = props.value

        if (receipt) {
          file = {
            uri: receipt.uri,
            name: receipt.uri.split('/').pop() ?? '',
            type: `image/${receipt.uri.split('.').pop()}` ?? '',
          }
        }

        const uploadResp = await postUploadReceipt({
          secure_id: secureId,
          file,
        })
          .unwrap()
          .catch((error) => showAlert(error))

        if (uploadResp && uploadResp.success) {
          Toast.show({ type: 'success', text1: uploadResp.message })
        }
      } catch (e) {
        console.log(e)
      }
    }

    useImperativeHandle(ref, () => ({
      uploadBankSlip,
    }))

    return (
      <View sx={{ width: '100%', mt: '$2' }}>
        <Text>{t('deposit.upload.title')} :</Text>
        <Text sx={{ fontSize: 12, mt: 5, mb: 5 }}>
          {t('deposit.uplaod.description')}
        </Text>
        <FilePicker placeholder={t('deposit.upload.files')} {...props} />
      </View>
    )
  }
)

BankSlipUpload.displayName = 'BankSlipUpload'

export default BankSlipUpload
