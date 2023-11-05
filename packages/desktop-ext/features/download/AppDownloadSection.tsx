import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import Button from 'app/components/common/Button'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, Text, View, useResponsiveValue } from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { ImageBackground, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import QRCode from 'react-native-qrcode-svg'

const HowToInstall = `${MEDIA_DOMAIN}${CONTENT_URI}/download/How_To_Install.mp4`
const DownloadGuideThumbnail = `${MEDIA_DOMAIN}${CONTENT_URI}/download/dl_guide_thumbnail.jpg`

const AppDownloadSection = () => {
  const { t } = useLocalization()
  const ref = useRef<RNView>(null)
  const width = useContainerWidth(ref)
  const qrWidth = Math.min(width * 0.3, 125)
  const [isPlaying, setIsPlaying] = useState(false)
  const isDesktop = useIsDesktop()

  return (
    <View sx={{ flexDirection: isDesktop ? 'row' : 'column' }}>
      <ImageBackground
        source={{ uri: `${MEDIA_DOMAIN}${CONTENT_URI}/download/BG_DL.jpg` }}
        style={{
          aspectRatio: isDesktop ? 1 / 1 : undefined,
          flex: 1 / 3,
          alignItems: 'center',
          minHeight: 233,
        }}
      >
        <View
          sx={{
            p: ['$3', '$3', '$3', '$3', '$4'],
            flex: 1,
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'space-evenly',
          }}
          ref={ref}
        >
          <Image
            source={require('../../../app/assets/images/common/logo.png')}
            alt="logo"
            sx={{
              aspectRatio: 67 / 24,
              width: [150, '25%', '25%', '45%'],
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
              // maintenance
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
          aspectRatio: 16 / 9,
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
              source={{ uri: DownloadGuideThumbnail }}
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
                  width: [100, 125],
                  height: [100, 125],
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
            source={{ uri: HowToInstall }}
            videoStyle={{ position: 'relative', height: '100%' }}
            isLooping
            shouldPlay={isPlaying}
            useNativeControls
            style={{
              height: '100%',
            }}
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
  maintenance = false,
}: {
  label: string
  width: number
  device: string
  maintenance?: boolean
}) => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  return (
    <View sx={{ alignItems: 'center' }}>
      <QRCode value={REFERRAL_DOMAIN} size={width} ecl="H" quietZone={12} />

      {maintenance && (
        <View
          sx={{
            width,
            aspectRatio: 1 / 1,
            bg: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ textAlign: 'center' }}>
            {t('common.underMaintenance')}
          </Text>
        </View>
      )}

      <Text sx={{ fontWeight: 'bold', pt: '$1', pb: '$2' }}>{t(label)}</Text>
      <Button
        sx={{ borderRadius: 30 }}
        contentProps={{ sx: { py: '$1', px: ['$3', '$3', '$3', '$3', '$4'] } }}
        titleProps={{ sx: { fontSize: 12 } }}
        disabled={maintenance}
        onPress={() => openModal('DownloadGuideModal', { label: device })}
      >
        {t('download.downloadGuide')}
      </Button>
    </View>
  )
}

export default AppDownloadSection
