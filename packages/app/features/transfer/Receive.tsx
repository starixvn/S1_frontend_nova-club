import QRCodeGenerator from 'app/components/QRCodeGenerator'
import ViewScreenShot, {
  ViewScreenShotMethods,
} from 'app/components/ViewScreenShot'
import useLocalization from 'app/provider/localization'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import React, { useRef } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const Receive = () => {
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
        <Text sx={{ fontSize: 16 }}>
          Scan with your app to transfer balance
        </Text>
      </View>
      <Pressable
        sx={{
          alignItems: 'center',
          py: '$3',
          bg: '$secondary.500',
          borderRadius: 15,
        }}
        onPress={handleDownload}
      >
        <Text sx={{ fontSize: 18, fontWeight: 'bold' }}>DOWNLOAD QR CODE</Text>
      </Pressable>
    </ScrollView>
  )
}

export default Receive
