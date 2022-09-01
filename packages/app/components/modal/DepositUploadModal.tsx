import ReceiptUpload, {
  ReceiptUploadMethods,
} from 'app/features/deposit/ReceiptUpload'
import useLocalization from 'app/provider/localization'
import { Box, Image, Text } from 'dripsy'
import React, { useRef, useState } from 'react'
import { FileInputValue } from '../form/FileInput/useFileInputHandler'
import ModalContent from './ModalContent'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import ModalWrapper from './ModalWrapper'

const DepositUploadModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const depositUploadRef = useRef<ReceiptUploadMethods>(null)
  const [receipt, setReceipt] = useState<FileInputValue>()

  const descInfo = getParam('descInfo', '')
  const fields = getParam('fields', '')

  const isShowingFields = descInfo && fields

  function onDismiss() {
    closeModal()
  }

  const handleSubmit = async () => {
    let uploadResp
    if (depositUploadRef.current) {
      uploadResp = await depositUploadRef.current.uploadReceipt(
        descInfo.transactionId
      )

      if (uploadResp.success)
        Toast.show({ type: 'success', text1: t('status.receiptSuccess') })
      closeModal()
    }
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('deposit.upload.title')}
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: handleSubmit,
          },
        ]}
      >
        {isShowingFields &&
          fields.map((field) => {
            return (
              <Box sx={{ p: '$2' }} key={field.value?.toString()}>
                <Text sx={{ fontWeight: 'bold' }}>
                  {t(field.label?.toString())} :
                </Text>
                <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text sx={{ mt: '$1' }}>
                    {descInfo[field.value]?.toString() ?? ''}
                  </Text>
                </Box>
              </Box>
            )
          })}

        <ReceiptUpload
          ref={depositUploadRef}
          value={receipt}
          onSelect={setReceipt}
        />
      </ModalContent>
    </ModalWrapper>
  )
}

export default DepositUploadModal
