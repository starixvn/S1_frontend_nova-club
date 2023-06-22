import useLocalization from 'app/provider/localization'
import { Box, Text } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { modalDelaySubmission } from 'utils/common'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import Image from '../common/Image'

const WithdrawalConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const withdrawalInfo = getParam('withdrawalInfo', '')
  const bankLogo = getParam('bankLogo', '')
  const fields = getParam('fields', '')
  const onConfirm = getParam('onConfirm')

  const isShowingFields = withdrawalInfo && fields

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    onConfirm && modalDelaySubmission(() => onConfirm())
    onDismiss()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('menu.withdrawalConfirmation')}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onWithdrawalConfirmed,
          },
        ]}
      >
        <>
          {bankLogo ? (
            <Image
              source={
                typeof bankLogo === 'string'
                  ? {
                      uri: bankLogo,
                    }
                  : bankLogo
              }
              resizeMode="contain"
              sx={{ mx: '$2', width: 100, height: 100 }}
              alt="bank logo"
            />
          ) : null}
          {isShowingFields &&
            fields.map((field) => {
              return (
                <Box sx={{ p: '$2' }} key={field.value?.toString()}>
                  <Text sx={{ fontWeight: 'bold' }}>
                    {t(field.label?.toString())} :
                  </Text>
                  <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      sx={{
                        mt: '$1',
                        ...Platform.select({
                          web: {
                            wordBreak: 'break-word',
                          },
                        }),
                      }}
                    >
                      {withdrawalInfo[field.value]?.toString() ?? ''}
                    </Text>
                  </Box>
                </Box>
              )
            })}
        </>
      </ModalContent>
    </ModalWrapper>
  )
}

export default WithdrawalConfirmationModal
