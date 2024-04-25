import { ModalStackParams } from 'app/provider/modal'
import { Pressable, Row, SxProp, Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import QRCode from 'react-native-qrcode-svg'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import useCountDownTimer from 'app/hooks/useCountDownTimer'
import dayjs from 'dayjs'
import useLocalization from 'app/provider/localization'
import IconButton from '../IconButton'
import { copyToClipboard } from 'app/utils'

type AlertModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'DepositEWalletModal'
>

const DepositEWalletModal = ({
  modal: { closeModal, getParam },
}: AlertModalProps) => {
  const eWalletInfo = getParam('eWalletInfo')
  const { t } = useLocalization()

  const { width } = useWindowDimensions()

  const modalSize = Math.min(500, width * 0.9)
  const qrSize = Math.min(400, modalSize * 0.5)
  const { startTimer, clearTimer, countDownValue, isCountDownRunning } =
    useCountDownTimer({
      duration: 5,
    })

  useEffect(() => {
    startTimer(dayjs(), closeModal)
  }, [])

  return (
    <ModalWrapper sx={{ width: modalSize }}>
      <ModalContent close={closeModal} isShowHeader={false}>
        <View sx={{ alignItems: 'center', justifyContent: 'center', pb: '$3' }}>
          {eWalletInfo && (
            <>
              <Text
                numberOfLines={1}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '$4',
                  lineHeight: 35,
                  flex: 1,
                }}
              >
                {eWalletInfo.channel}
              </Text>
              <Text sx={{ mb: '$3' }}>{eWalletInfo.method}</Text>
              <QRCode
                value={eWalletInfo.qrString}
                size={qrSize}
                ecl="H"
                quietZone={12}
                logoBackgroundColor="white"
                logoBorderRadius={100}
              />
              <View sx={{ alignSelf: 'flex-start', mt: '$3', mx: '2%' }}>
                <Text
                  sx={{
                    textAlign: 'center',
                    fontSize: defaultFontSize,
                    mb: '$2',
                  }}
                >
                  {
                    'To expedite the deposit process, please ensure that you are using the correct account for the payment.'
                  }
                </Text>
                <InfoRow
                  label={`${t('bank.accountNo')}`}
                  value={eWalletInfo.bankAccount}
                />
                <InfoRow
                  label={`${t('bank.accountName')}`}
                  value={eWalletInfo.bankAccountName}
                />
                <InfoRow
                  label={`${t('common.amount')} (${eWalletInfo.currency})`}
                  value={eWalletInfo.amount}
                  valueSx={{ color: '$info', fontWeight: 'bold' }}
                  copyContent={
                    isNaN(Number(eWalletInfo.amount))
                      ? 0
                      : Number(eWalletInfo.amount)
                  }
                />
                <InfoRow
                  label={`Ref.`}
                  value={eWalletInfo.transactionId}
                  valueSx={{ color: '$placeholder', fontWeight: 'bold' }}
                />
              </View>
              <Text sx={{ fontWeight: 'bold', mt: '$2' }}>{`${t(
                'common.expiresIn'
              )} : ${countDownValue.toString()}`}</Text>
            </>
          )}
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default DepositEWalletModal

type InfoRowProps = {
  label: string
  value: string
  valueSx?: SxProp
  copyContent?: string | number
}

const defaultFontSize = 14
function InfoRow({ label, value, valueSx, copyContent }: InfoRowProps) {
  return (
    <Row sx={{ alignItems: 'center', mb: '$1' }}>
      <Text
        sx={{ fontWeight: 'bold', fontSize: defaultFontSize }}
      >{`${label} : `}</Text>
      <Text sx={{ fontSize: defaultFontSize, ...valueSx }}>{value}</Text>
      <IconButton
        sx={{ ml: 'auto', mt: -2 }}
        name="copy"
        onPress={() => {
          copyToClipboard(copyContent ? copyContent.toString() : value)
        }}
      />
    </Row>
  )
}
