import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Box, Text } from 'dripsy'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { SubmitDepositCryptoItem } from 'services/deposit.type'
import CopyField from '../CopyField'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import Timer from '../Timer'

const DepositCryptoModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()

  const data = getParam('data', '') as SubmitDepositCryptoItem

  const FIELDS = [
    {
      label: 'deposit.transactionId',
      value: data.transaction_id,
      copy: true,
    },
    {
      label: 'deposit.cryptoChannel',
      value: data.payment_token,
    },
    {
      label: 'deposit.cryptoAddress',
      value: data.payment_address,
      copy: true,
    },
    {
      label: 'deposit.cryptoAmount',
      value: data.payment_amount,
    },
  ]

  return (
    <ModalWrapper>
      <ModalContent
        title={t('menu.depositConfirmation')}
        hideCloseButton
        closeModal={closeModal}
        actions={[
          {
            label: t('common.confirm'),
          },
        ]}
      >
        <Box sx={{ flexDirection: 'column', flexWrap: 'wrap' }}>
          <Box sx={{ width: '100%', alignItems: 'center', mb: '$4' }}>
            <QRCode
              value={data.payment_address}
              size={Math.min(width * 0.7, 250)}
              ecl="H"
              quietZone={12}
              logoBackgroundColor="white"
              // logoMargin={4}
              logoBorderRadius={100}
            />
          </Box>
          {data &&
            FIELDS.map((field) => {
              return (
                <Box
                  sx={{ width: '100%', my: '$2' }}
                  key={field.value?.toString()}
                >
                  <Text sx={{ fontWeight: 'bold' }}>
                    {t(field.label?.toString())} :
                  </Text>
                  <CopyField
                    label={field.value?.toString() ?? ''}
                    containerStyle={{ mt: '$1' }}
                    isCopy={field.copy}
                  />
                </Box>
              )
            })}
          <Text sx={{ fontWeight: 'bold', color: '$accent' }}>
            {`${data.payment_amount} = ${data.invoice_currency} ${data.invoice_amount}`}
          </Text>

          <Box sx={{ alignItems: 'center', mt: '$1' }}>
            <Text
              sx={{ textAlign: 'center', fontWeight: 'bold', color: '$error' }}
            >
              {t('deposit.paymentTime')}
            </Text>
            <Timer seconds={600} onEnded={closeModal} />
          </Box>
        </Box>
      </ModalContent>
    </ModalWrapper>
  )
}

export default DepositCryptoModal
