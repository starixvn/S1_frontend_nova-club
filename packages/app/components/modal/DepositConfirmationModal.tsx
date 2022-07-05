import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text } from 'dripsy'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '.'
import ModalContent from './ModalContent'
import RNModal from './ModalContent'
const BANK_IMG_RATIO = 216 / 115

const DepositConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()

  const amount = getParam('amount', 0)
  const callback = getParam('callback')

  const currency = useSelector(
    (s: RootState) => s.auth.user?.currency
  ) as Currency

  function onDismiss() {
    closeModal()
  }

  function onDepositConfirmed() {
    callback && callback()
    onDismiss()
  }

  return (
    <ModalContent
      title={t('common.importantNote')}
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
  )
}

export default DepositConfirmationModal
