import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../form/Button'
import ModalWrapper from './ModalWrapper'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'

const QRTransferModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const referralCode = data?.data?.referral_code

  function onDismiss() {
    closeModal()
  }

  return (
    <ModalWrapper
      sx={{ width, height, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          p: '$4',
          width: '100%',
        }}
      >
        <View sx={{ mb: '$4', alignItems: 'center' }}>
          <QRCode
            value={referralCode}
            size={width * 0.5}
            logo={require('../../assets/nclub-appicon.png')}
            // logoSize={width * 0.2}
            quietZone={12}
            logoBackgroundColor="white"
            logoMargin={4}
            logoBorderRadius={100}
          />
        </View>
        <Button
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={() => onDismiss()}
        >
          <Button.Label>{t('common.close')}</Button.Label>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QRTransferModal
