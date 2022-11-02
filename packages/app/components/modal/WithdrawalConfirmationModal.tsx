import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Box, Image, Text } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const WithdrawalConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()

  const withdrawalInfo = getParam('withdrawalInfo', '')
  const bankLogo = getParam('bankLogo', '')

  const fields = getParam('fields', '')
  const onConfirm = getParam('onConfirm')

  const isShowingFields = withdrawalInfo && fields

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    onDismiss()
    setTimeout(() => {
      onConfirm && onConfirm()
    }, 150)
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('menu.withdrawalConfirmation')}
        closeModal={closeModal}
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
        <Image
          source={
            typeof bankLogo === 'string'
              ? {
                  uri: bankLogo,
                }
              : bankLogo
          }
          sx={{ mx: '$2', width: 100, height: 100 }}
        />
        {isShowingFields &&
          fields.map((field) => {
            return (
              <Box sx={{ p: '$2' }} key={field.value?.toString()}>
                <Text sx={{ fontWeight: 'bold' }}>
                  {t(field.label?.toString())} :
                </Text>
                <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text sx={{ mt: '$1' }}>
                    {withdrawalInfo[field.value]?.toString() ?? ''}
                  </Text>
                </Box>
              </Box>
            )
          })}
      </ModalContent>
    </ModalWrapper>
  )
}

export default WithdrawalConfirmationModal
