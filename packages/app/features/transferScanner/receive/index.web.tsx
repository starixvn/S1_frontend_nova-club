import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { createRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'
import useDownload from 'app/hooks/useDownload'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import { Button } from 'app/components/form/Button'
import QRCodeGenerator from 'app/components/QRCodeGenerator'

const QrReceiveTab = () => {
  const { t } = useLocalization()
  const ref = createRef(null)

  const { width, height } = useContainerDimension()

  const { webScreenshotDownload } = useDownload({ ref })

  return (
    <ModalWrapper sx={{ width, p: '10%' }}>
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          p: '5%',
          width: '100%',
        }}
      >
        <View ref={ref}>
          <QRCodeGenerator />
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
          onPress={webScreenshotDownload}
        >
          <Button.Label>{t('qr.downloadQrCode')}</Button.Label>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QrReceiveTab
