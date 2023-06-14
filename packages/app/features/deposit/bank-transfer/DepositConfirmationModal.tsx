import ModalContent from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import { useState } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const DepositConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const amount = getParam('amount', '')
  const callback = getParam('callback')

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const handleDismiss = () => {
    closeModal()
  }

  function onDepositConfirmed() {
    callback && callback()
    handleDismiss()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title="Deposit Confirmation"
        actions={[
          {
            label: t('common.cancel'),
            onPress: handleDismiss,
          },
          {
            label: t('common.confirm'),
            onPress: onDepositConfirmed,
          },
        ]}
      >
        <View sx={{ alignItems: 'center' }}>
          <Text sx={{ mt: '$4', fontSize: 14 }}>
            Please confirm deposit information below
          </Text>
          <Text sx={{ mt: '$3', fontSize: 16, fontWeight: '400' }}>
            {`${t('deposit.depositAmount')} : ${toCurrency(amount, currency, {
              hideTruncatedThousand: false,
              forceDecimal: false,
            })}`}
          </Text>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}
export default DepositConfirmationModal
