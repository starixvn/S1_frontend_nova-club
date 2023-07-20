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
      title: 'deposit.transactionId',
      value: depositInfo.depositId,
    },
    {
      title: 'deposit.paymentMode',
      value: depositInfo.paymentMode,
    },
    {
      title: 'deposit.date',
      value: depositInfo.date,
    },
    {
      title: 'deposit.status',
      value: depositInfo.status,
    },
    {
      title: 'deposit.amount',
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
        title="deposit.uploadBankSlip"
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
                    {t(item.title)} :
                  </Text>
                  <Text sx={{ fontSize: 12, mt: 5 }}>{item.value}</Text>
                </View>
              ))}
            <View sx={{ width: '100%', mt: '$2' }}>
              <Text>{t('deposit.upload.title')} :</Text>
              <Text sx={{ fontSize: 12, mt: 5, mb: 5 }}>
                {t('deposit.upload.description')}
              </Text>
              <FilePicker
                value={receipt}
                onChange={(e) => {
                  console.log('e', e)
                  setReceipt(e)
                }}
                placeholder={t('deposit.upload.files')}
              />
            </View>
          </View>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default UploadBankSlipModal
