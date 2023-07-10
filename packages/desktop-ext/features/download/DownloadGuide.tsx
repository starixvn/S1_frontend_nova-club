import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import useLocalization from 'app/provider/localization'
import { Image, Text, View } from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import React, { useRef } from 'react'
import { ImageBackground, View as RNView } from 'react-native'
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import { SolitoImage } from 'solito/image'

interface DeviceType {
  ios: GuideContent[]
  android: GuideContent[]
}

interface GuideContent {
  guideText: string
  guideImage: string
}

const device: DeviceType = {
  ios: [
    {
      guideText: 'Click app download button\non our VUI123 site.',
      guideImage: '../../../app/assets/images/download/IOS_1.png',
    },
    {
      guideText:
        'A new tab will be opened in\nyour web browser, click on\nthe "Get the App button',
      guideImage: '../../../app/assets/images/download/IOS_2.png',
    },
    {
      guideText:
        'You will be redirected to\n"Vui Fit app on App Store\ninstead of VUI123 app"',
      guideImage: '../../../app/assets/images/download/IOS_3.png',
    },
    {
      guideText: 'Click "Get" to install the\n"Vui Fit" app',
      guideImage: '../../../app/assets/images/download/IOS_4.png',
    },
    {
      guideText:
        'Open "Vui Fit" app to launch\nVUI123 app. Start enjoying your\nexclusive bonus and games',
      guideImage: '../../../app/assets/images/download/IOS_5.png',
    },
  ],
  android: [
    {
      guideText: 'Click app download button\non our VUI123 site.',
      guideImage: '../../../app/assets/images/download/ADR_1.png',
    },
    {
      guideText:
        'A new tab will be opened in\nyour web browser, click on\nthe "Download anyway.',
      guideImage: '../../../app/assets/images/download/ADR_2.png',
    },
    {
      guideText:
        'Install VUI123.apk to launch\nVUI123 app. Start enjoying your\nexclusive bonuses and games.',
      guideImage: '../../../app/assets/images/download/ADR_3.png',
    },
  ],
}

const DownloadGuide = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const ref = useRef<RNView>(null)
  const deviceType = getParam('label')
  const data = deviceType === 'ios' ? device.ios : device.android

  return (
    <>
      <ModalWrapper>
        <ImageBackground
          source={require('../../../app/assets/images/download/BG_GUIDE.jpg')}
          style={{
            aspectRatio: 16 / 9,
            flex: 1,
            alignItems: 'center',
          }}
        >
          <View sx={{ flexDirection: 'row', p: '$3' }}>
            {/* <Carousel
            loop
            width={250}
            height={500}
            autoPlay
            autoPlayInterval={5000}
            data={data}
            scrollAnimationDuration={1000}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
              <View pointerEvents="none">
                <SolitoImage
                  // src={`${MEDIA_DOMAIN}/${CONTENT_URI}/banners/${item.image}`}
                  src={item.}
                  height={height}
                  width={width}
                  alt={item.alt ?? ''}
                  resizeMode="cover"
                />
              </View>
            )}
            
            {...rest}
          /> */}
          </View>
        </ImageBackground>
      </ModalWrapper>
    </>
  )
}

export default DownloadGuide
