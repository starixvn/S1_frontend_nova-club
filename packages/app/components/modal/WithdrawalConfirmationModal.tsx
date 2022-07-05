import useLocalization from 'app/provider/localization'
import { Box, Text } from 'dripsy'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from '.'

interface WithdrawalConfirmationInfo {
  [index: string]: any
  onConfirm: () => void
}

interface Field {
  label: String
  value: String
}

export interface WithdrawalConfirmationModalHandler {
  setConfirmationInfo: (
    info: WithdrawalConfirmationInfo,
    fields: Field[]
  ) => void
}

const WithdrawalConfirmationModal =
  forwardRef<WithdrawalConfirmationModalHandler>(({}, ref) => {
    const { t } = useLocalization()
    const [localInfo, setLocalInfo] =
      useState<WithdrawalConfirmationInfo | null>()
    const [fields, setFields] = useState<Field[]>()

    useImperativeHandle(ref, () => ({
      setConfirmationInfo: (info, f) => {
        setLocalInfo(info)
        setFields(f)
      },
    }))

    function onDismiss(triggerConfirm?: boolean) {
      setLocalInfo(null)
      if (triggerConfirm && localInfo) localInfo.onConfirm()
    }

    const isShowingFields = localInfo && fields

    return (
      <Modal
        isVisible={!!localInfo}
        title={t('common.importantNote')}
        onModalHide={onDismiss}
        onBackdropPress={() => onDismiss(false)}
        actions={[
          {
            label: t('common.cancel'),
            onPress: () => {
              onDismiss()
            },
          },
          {
            label: t('common.submit'),
            onPress: () => {
              onDismiss(true)
            },
          },
        ]}
      >
        {isShowingFields &&
          fields.map((f, index) => {
            return (
              <Box sx={{ p: '$2' }} key={f.value?.toString()}>
                <Text sx={{ fontWeight: 'bold' }}>
                  {t(f.label?.toString())} :
                </Text>
                <Text sx={{ mt: '$1' }}>
                  {localInfo[f.value]?.toString() ?? ''}
                </Text>
              </Box>
            )
          })}
      </Modal>
    )
  })

WithdrawalConfirmationModal.displayName = 'WithdrawalConfirmationModal'

export default WithdrawalConfirmationModal
