import QRCodeGenerator from 'app/components/QRCodeGenerator'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useDownload from 'app/hooks/useDownload'
import useLocalization from 'app/provider/localization'
import { ScrollView, View, Text, Pressable } from 'dripsy'
import React, { useRef } from 'react'
import ViewShot from 'react-native-view-shot'
import { usePlayerProfileQuery } from 'services/playerApi'

const Receive = () => {
  const { t } = useLocalization()
  const ref = useRef()

  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const username = data?.username

  const { appScreenshotDownload } = useDownload({ ref })
  //   const [list, setList] = useState<typeof MessageList>([])

  //   useEffect(() => {
  //     setList(MessageList)
  //   }, [])

  return (
    <ScrollView contentContainerStyle={{ padding: '10%' }}>
      <View sx={{ p: '2%', borderRadius: 15, bg: 'white' }}>
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
        onPress={appScreenshotDownload}
      >
        <Text sx={{ fontSize: 18, fontWeight: 'bold' }}>DOWNLOAD QR CODE</Text>
      </Pressable>
    </ScrollView>
  )
}

export default Receive
