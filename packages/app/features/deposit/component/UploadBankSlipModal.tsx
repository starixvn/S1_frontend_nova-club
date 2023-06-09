import FilePicker from 'app/components/form/FilePicker'
import ModalContent from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useUploadDepositSlipMutation } from 'services/deposit'

const UploadBankSlipModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [receipt, setReceipt] = useState<ImagePicker.ImagePickerAsset>()
  const depositInfo = getParam('depositInfo', '')

  const [postUploadReceipt] = useUploadDepositSlipMutation()

  const handleDismiss = () => {
    closeModal()
  }

  const DepositDetail = [
    {
      title: 'Transaction ID',
      value: depositInfo.depositId,
    },
    {
      title: 'Payment Mode',
      value: depositInfo.paymentMode,
    },
    {
      title: 'Date',
      value: depositInfo.date,
    },
    {
      title: 'Status',
      value: depositInfo.status,
    },
    {
      title: 'Amount',
      value: depositInfo.amount,
    },
  ]

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      let file

      if (receipt) {
        file = {
          uri: receipt.uri,
          name: receipt.uri.split('/').pop() ?? '',
          type: `image/${receipt.uri.split('.').pop()}` ?? '',
        }
      }

      const uploadResp = await postUploadReceipt({
        secure_id: depositInfo.depositId,
        file,
      })
        .unwrap()
        .catch((error) => showAlert(error))

      if (uploadResp && uploadResp.success) {
        Toast.show({ type: 'success', text1: uploadResp.message })
        setReceipt(undefined)
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
        title="Upload Bank Slip"
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
        <View sx={{ alignItems: 'center' }}>
          <View
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '90%',
            }}
          >
            {DepositDetail &&
              DepositDetail.map((item, index) => (
                <View
                  key={item.value}
                  sx={{
                    width: '50%',
                    mb:
                      DepositDetail.length - index <= 1 && (index + 1) % 2 === 1
                        ? 0
                        : '$2',
                  }}
                >
                  <Text sx={{ fontSize: 16, fontWeight: '100' }}>
                    {item.title} :
                  </Text>
                  <Text sx={{ fontSize: 12, mt: 5 }}>{item.value}</Text>
                </View>
              ))}
            <View sx={{ width: '100%', mt: '$2' }}>
              <Text>{'Upload receipt'} :</Text>
              <Text sx={{ fontSize: 12, mt: 5, mb: 5 }}>
                {'Browse your Bank Transfer Receipt or Invoice'}
              </Text>
              <FilePicker
                value={receipt}
                onChange={(e) => {
                  console.log('e', e)
                  setReceipt(e)
                }}
                placeholder="Select File"
              />
            </View>
          </View>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default UploadBankSlipModal
