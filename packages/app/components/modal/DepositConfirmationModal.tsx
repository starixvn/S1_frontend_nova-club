import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text } from 'dripsy'
import React from 'react'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const BANK_IMG_RATIO = 216 / 115

const DepositConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const amount = getParam('amount', 0)
  const callback = getParam('callback')

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  function onDismiss() {
    closeModal()
  }

  function onDepositConfirmed() {
    callback && callback()
    onDismiss()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('menu.depositConfirmation')}
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onDepositConfirmed,
          },
        ]}
      >
        <Text>{t('deposit.pleaseConfirmDeposit')}</Text>

        <Text>
          {`${t('deposit.depositAmount')} : ${toCurrency(amount, currency, {
            hideTruncatedThousand: false,
            forceDecimal: false,
          })}`}
        </Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default DepositConfirmationModal
