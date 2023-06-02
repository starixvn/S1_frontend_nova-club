import QRCodeGenerator from 'app/components/QRCodeGenerator'
import ViewScreenShot, {
  ViewScreenShotMethods,
} from 'app/components/ViewScreenShot'
import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View } from 'dripsy'
import React, { useRef } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const QrReceive = () => {
  const { t } = useLocalization()
  const ref = useRef<ViewScreenShotMethods>(null)

  const { data } = usePlayerProfileQuery()
  const username = data?.username

  const handleDownload = () => {
    ref?.current?.download()
  }

  return (
    <ScrollView contentContainerStyle={{ padding: '10%' }}>
      <View sx={{ p: '2%', borderRadius: 15, bg: 'white' }}>
        <ViewScreenShot ref={ref} fileName={`Vui123-${username}`}>
          <QRCodeGenerator />
        </ViewScreenShot>
      </View>
      <View sx={{ alignItems: 'center', py: '$3' }}>
        <Text sx={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
      </View>
      <View sx={{ alignItems: 'center', py: '$3' }}>
        <Text sx={{ fontSize: 16 }}>{t('notes.qr.n1')}</Text>
      </View>
      <Button onPress={handleDownload}>{t('qr.downloadQr')}</Button>
    </ScrollView>
  )
}

export default QrReceive
