import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import Button from 'app/components/common/Button'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, Text, View, useDripsyTheme } from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { ImageBackground, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import QRCode from 'react-native-qrcode-svg'
const HowToInstall =
  `${MEDIA_DOMAIN}${CONTENT_URI}/download/How_To_Install.mp4` as any
const DownloadGuideThumbnail =
  `${MEDIA_DOMAIN}${CONTENT_URI}/download/dl_guide_thumbnail.jpg` as any

const DOWNLOAD_APP_LINK = 'https://s2syf.app.link/7rqfWLKDhtb'

const AppDownloadSection = () => {
  const { t } = useLocalization()
  const ref = useRef<RNView>(null)
  const width = useContainerWidth(ref)
  const qrWidth = Math.min(width * 0.3, 125)
  const [isPlaying, setIsPlaying] = useState(false)
  const { theme } = useDripsyTheme()
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
            <QRCodeDownloadGuideItem
              label="download.ios"
              device={'ios'}
              width={qrWidth}
            />
            <QRCodeDownloadGuideItem
              label="download.android"
              device={'android'}
              width={qrWidth}
            />
          </View>
        </View>
      </ImageBackground>
      <View
        sx={{
          flex: 2 / 3,
          minHeight: 375,
        }}
      >
        {!isPlaying && (
          <Pressable
            onPress={() => {
              setIsPlaying(!isPlaying)
            }}
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 2,
            }}
          >
            <ImageBackground
              source={DownloadGuideThumbnail}
              alt="download-guide"
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                sx={{
                  width: 125,
                  height: 125,
                  borderRadius: 25,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="next" size={80} color={'$primary.50'} />
              </View>
            </ImageBackground>
          </Pressable>
        )}

        {isPlaying && (
          <Video
            source={HowToInstall}
            videoStyle={{ position: 'relative' }}
            isLooping
            shouldPlay={isPlaying}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}
      </View>
    </View>
  )
}

const QRCodeDownloadGuideItem = ({
  label,
  width,
  device,
}: {
  label: string
  width: number
  device: string
}) => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  return (
    <View sx={{ alignItems: 'center' }}>
      <QRCode value={DOWNLOAD_APP_LINK} size={width} ecl="H" quietZone={12} />
      <Text sx={{ fontWeight: 'bold', pt: '$1', pb: '$2' }}>{t(label)}</Text>
      <Button
        sx={{ borderRadius: 30 }}
        contentProps={{ sx: { py: '$1', px: ['$3', '$3', '$3', '$3', '$4'] } }}
        titleProps={{ sx: { fontSize: 12 } }}
        onPress={() => openModal('DownloadGuideModal', { label: device })}
      >
        {t('download.downloadGuide')}
      </Button>
    </View>
  )
}

export default AppDownloadSection
