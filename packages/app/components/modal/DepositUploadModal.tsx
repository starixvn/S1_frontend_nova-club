import ReceiptUpload, {
  ReceiptUploadMethods,
} from 'app/features/deposit/ReceiptUpload'
import useLocalization from 'app/provider/localization'
import { Box, Image, Text } from 'dripsy'
import React, { useCallback, useRef, useState } from 'react'
import { FileInputValue } from '../form/FileInput/useFileInputHandler'
import ModalContent from './ModalContent'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import ModalWrapper from './ModalWrapper'
import { useDispatch } from 'react-redux'
import { DepositActions } from 'app/store/deposit.slice'

const DepositUploadModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const depositUploadRef = useRef<ReceiptUploadMethods>(null)
  const [receipt, setReceipt] = useState<FileInputValue>()
  const [isUploading, setUploading] = useState(false)

  const descInfo = getParam('descInfo', '')
  const fields = getParam('fields', '')

  const isShowingFields = descInfo && fields

  async function handleSubmit() {
    let uploadResp

    if (depositUploadRef.current) {
      setUploading(true)
      uploadResp = await depositUploadRef.current.uploadReceipt(
        descInfo.transactionId
      )
      setUploading(false)
      if (uploadResp.success) {
        dispatch(DepositActions.setUpdatedSlipId(descInfo.transactionId))
        Toast.show({ type: 'success', text1: t('status.receiptSuccess') })
      }
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
          },
          {
            label: t('common.submit'),
            onPress: handleSubmit,
            disabled: !receipt,
            loading: isUploading,
            disableAutoClose: true,
          },
        ]}
      >
        <Box sx={{ flexDirection: 'row', flexWrap: 'wrap', mb: '$4' }}>
          {isShowingFields &&
            fields.map((field) => {
              return (
                <Box
                  sx={{ width: '50%', my: '$2', pr: '$4' }}
                  key={field.value?.toString()}
                >
                  <Text sx={{ fontWeight: 'bold' }}>
                    {t(field.label?.toString())} :
                  </Text>
                  <Text sx={{ mt: '$1' }}>
                    {descInfo[field.value]?.toString() ?? ''}
                  </Text>
                </Box>
              )
            })}
        </Box>
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
