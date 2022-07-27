import { getBankLogo } from 'app/config/bank'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Box, Image, Text } from 'dripsy'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import ModalContent from './ModalContent'

const WithdrawalConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()

  const withdrawalInfo = getParam('withdrawalInfo', '')
  const bankLogo = getParam('bankLogo', '')
  console.log(
    '🚀 ~ file: WithdrawalConfirmationModal.tsx ~ line 19 ~ WithdrawalConfirmationModal ~ bankLogo',
    bankLogo
  )
  const fields = getParam('fields', '')
  const onConfirm = getParam('onConfirm')

  const isShowingFields = withdrawalInfo && fields

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    onConfirm && onConfirm()
    onDismiss()
  }

  return (
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
      <Image source={bankLogo} sx={{ mx: '$2', width: 60, aspectRatio: 1 }} />
      {isShowingFields &&
        fields.map((field) => {
          console.log(
            '🚀 ~ file: WithdrawalConfirmationModal.tsx ~ line 64 ~ fields.map ~ field',
            field
          )
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
  )
}

export default WithdrawalConfirmationModal
