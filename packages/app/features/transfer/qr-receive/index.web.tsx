import Button from 'app/components/common/Button'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import QRCodeGenerator from 'app/components/QRCodeGenerator'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useDownload from 'app/hooks/useDownload'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { createRef } from 'react'

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

        <Button onPress={webScreenshotDownload}>
          {t('qr.downloadQrCode')}
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QrReceiveTab
