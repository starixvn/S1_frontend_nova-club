import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useLocalization from 'app/provider/localization'
import { Image, Text, View } from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import React, { useRef } from 'react'
import { ImageBackground, View as RNView } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
const HowToInstall =
  `${MEDIA_DOMAIN}${CONTENT_URI}/download/How_To_Install.mp4` as any

const DOWNLOAD_APP_LINK = 'https://s2syf.app.link/7rqfWLKDhtb'

const DownloadScreen = () => {
  const { t } = useLocalization()
  const ref = useRef<RNView>(null)
  const width = useContainerWidth(ref)
  const qrWidth = Math.min(width * 0.3, 125)

  return (
    <View sx={{ flexDirection: 'row' }}>
      <ImageBackground
        source={require('../../../app/assets/images/download/BG_DL.jpg')}
        style={{
          aspectRatio: 1 / 1,
          flex: 1 / 3,
          alignItems: 'center',
        }}
      >
        <View
          sx={{
            p: ['$3', '$3', '$3', '$3', '$4'],
            flex: 1,
            alignItems: 'center',
            width: '100%',
          }}
          ref={ref}
        >
          <Image
            source={require('../../../app/assets/images/common/logo.png')}
            alt="logo"
            sx={{
              aspectRatio: 67 / 24,
              width: '40%',
            }}
          />
          <Text
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: [14, 14, 14, 14, 20],
              textAlign: 'center',
              py: '$3',
            }}
          >
            {t('download.downloadAppNow')}
          </Text>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <QRCodeDownloadGuideItem label="download.ios" width={qrWidth} />
            <QRCodeDownloadGuideItem label="download.android" width={qrWidth} />
          </View>
        </View>
      </ImageBackground>
      <View
        sx={{
          flex: 2 / 3,
        }}
      >
        <Video
          source={HowToInstall}
          videoStyle={{ position: 'relative' }}
          isMuted
          isLooping
          //   shouldPlay
          useNativeControls
          resizeMode={ResizeMode.STRETCH}
        />
      </View>
    </View>
  )
}

const QRCodeDownloadGuideItem = ({
  label,
  width,
}: {
  label: string
  width: number
}) => {
  const { t } = useLocalization()
  return (
    <View sx={{ alignItems: 'center' }}>
      <QRCode value={DOWNLOAD_APP_LINK} size={width} ecl="H" quietZone={12} />
      <Text sx={{ fontWeight: 'bold', pt: '$1', pb: '$2' }}>{t(label)}</Text>
      <Button
        sx={{ borderRadius: 30 }}
        contentProps={{ sx: { py: '$1', px: ['$3', '$3', '$3', '$3', '$4'] } }}
        titleProps={{ sx: { fontSize: 12 } }}
      >
        {t('download.downloadGuide')}
      </Button>
    </View>
  )
}

export default DownloadScreen
