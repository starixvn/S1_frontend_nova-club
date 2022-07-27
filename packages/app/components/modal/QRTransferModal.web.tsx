import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { createRef } from 'react'
import { Button } from '../form/Button'
import ModalWrapper from './ModalWrapper'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as htmlToImage from 'html-to-image'

const QRTransferModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const ref = createRef(null)

  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username
  const referralCode = data?.data?.referral_code

  const createFileName = (extension = '', ...names) => {
    if (!extension) return ''

    return `${names.join('')}.${extension}`
  }

  const screenshot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node)
    return dataURI
  }

  const download = (
    image,
    { name = `Vui123-${username}`, extension = 'jpg' } = {}
  ) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  const onPressCaptureWeb = () => {
    screenshot(ref.current).then(download).then(closeModal())
  }

  return (
    <ModalWrapper sx={{ width }}>
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          p: '$4',
          width: '100%',
        }}
      >
        <View ref={ref}>
          <View
            sx={{
              alignItems: 'center',
              bg: 'white',
              aspectRatio: 1,
              justifyContent: 'space-evenly',
            }}
          >
            <Text sx={{ color: '$black' }}>{username}</Text>
            <QRCode
              value={referralCode}
              size={width * 0.5}
              logo={require('../../assets/nclub-appicon.png')}
              ecl="H"
              quietZone={12}
              logoBackgroundColor="white"
              logoMargin={4}
              logoBorderRadius={100}
            />
            <Text sx={{ color: '$black' }}>{t('notes.qr.n1')}</Text>
          </View>
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
          onPress={onPressCaptureWeb}
        >
          <Button.Label>{t('qr.downloadQrCode')}</Button.Label>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QRTransferModal
