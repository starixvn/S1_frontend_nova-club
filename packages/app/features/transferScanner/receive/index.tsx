import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useRef } from 'react'
import ViewShot from 'react-native-view-shot'
import useDownload from 'app/hooks/useDownload'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import { Button } from 'app/components/form/Button'
import QRCodeGenerator from 'app/components/QRCodeGenerator'
import { usePlayerProfileQuery } from 'services/playerApi'

const QrReceiveTab = () => {
  const { t } = useLocalization()
  const ref = useRef()

  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username

  const { appScreenshotDownload } = useDownload({ ref })

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
        <ViewShot
          ref={ref}
          options={{
            fileName: `Vui123-${username}`,
            format: 'png',
            quality: 0.9,
          }}
        >
          <QRCodeGenerator />
        </ViewShot>

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
          onPress={appScreenshotDownload}
        >
          <Button.Label>{t('qr.downloadQrCode')}</Button.Label>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QrReceiveTab
