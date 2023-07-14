import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import Button from 'app/components/common/Button'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, Text, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useRef, useState } from 'react'
import {
  ImageBackground,
  View as RNView,
  useWindowDimensions,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
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
      guideText: 'download.iosGuideText.n1',
      guideImage: 'IOS_1.png',
    },
    {
      guideText: 'download.iosGuideText.n2',
      guideImage: 'IOS_2.png',
    },
    {
      guideText: 'download.iosGuideText.n3',
      guideImage: 'IOS_3.png',
    },
    {
      guideText: 'download.iosGuideText.n4',
      guideImage: 'IOS_4.png',
    },
    {
      guideText: 'download.iosGuideText.n5',
      guideImage: 'IOS_5.png',
    },
  ],
  android: [
    {
      guideText: 'download.androidGuideText.n1',
      guideImage: 'ADR_1.png',
    },
    {
      guideText: 'download.androidGuideText.n2',
      guideImage: 'ADR_2.png',
    },
    {
      guideText: 'download.androidGuideText.n3',
      guideImage: 'ADR_3.png',
    },
  ],
}

const DownloadGuide = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const ref = useRef<ICarouselInstance>(null)
  const deviceType = getParam('label')
  const data = deviceType === 'ios' ? device.ios : device.android
  const { width: WindowWidth } = useWindowDimensions()

  const progressValue = useSharedValue<number>(0)
  const [guideTextIndex, setGuideTextIndex] = useState(0)
  const handleDismiss = () => {
    closeModal()
  }

  return (
    <>
      <ModalWrapper>
        <ImageBackground
          source={`${MEDIA_DOMAIN}${CONTENT_URI}/download/BG_GUIDE.jpg`}
          style={{
            aspectRatio: 16 / 9,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'green',
          }}
        >
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '100%',
              width: '100%',
            }}
          >
            <TouchableOpacity
              sx={{ left: 20, top: 25, position: 'absolute' }}
              onPress={() => closeModal()}
            >
              <Icon
                name={'next'}
                sx={{
                  transform: [{ rotateY: '180deg' }],
                }}
              />
            </TouchableOpacity>
            <AnimatePresence>
              <View sx={{ justifyContent: 'center' }}>
                <View sx={{ alignItems: 'center' }}>
                  <Text sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    GUIDE TO INSTALL
                  </Text>
                  <Image
                    source={require('../../../app/assets/images/common/logo.png')}
                    style={{
                      aspectRatio: 3 / 1,
                      alignItems: 'center',
                      width: 150,
                    }}
                    alt=""
                  />
                </View>
                <MotiView
                  key={guideTextIndex}
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'timing' }}
                  style={{}}
                >
                  <Text sx={{ fontWeight: 'bold', pt: '$4' }}>
                    STEP {guideTextIndex + 1}
                  </Text>
                  <Text
                    sx={{
                      pt: '$3',
                      width: 250,
                      lineHeight: 30,
                      minHeight: 125,
                    }}
                  >
                    {t(data[guideTextIndex].guideText)}
                  </Text>
                </MotiView>
              </View>
            </AnimatePresence>
            <View
              sx={{
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                sx={{
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                }}
              >
                {guideTextIndex !== 0 && (
                  <Button
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      ref.current?.scrollTo({ index: guideTextIndex - 1 })
                      setGuideTextIndex(guideTextIndex - 1)
                    }}
                    style={{
                      transform: [{ rotateY: '180deg' }],
                    }}
                  >
                    <Icon name="next" />
                  </Button>
                )}
              </View>

              <Carousel
                ref={ref}
                loop
                width={225}
                autoPlay
                autoPlayInterval={5000}
                data={data}
                scrollAnimationDuration={1000}
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                onSnapToItem={(index) => {
                  setGuideTextIndex(index)
                }}
                renderItem={({ item }) => (
                  <View
                    pointerEvents="none"
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      //   bg: 'yellow',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <Image
                      source={`${MEDIA_DOMAIN}/${CONTENT_URI}/download/${item.guideImage}`}
                      alt={''}
                      style={{
                        width: '90%',
                        height: '90%',
                        //   backgroundColor: 'red',
                      }}
                      resizeMode="contain"
                    />
                  </View>
                )}
              />
              <View
                sx={{
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                }}
              >
                {guideTextIndex < data.length - 1 && (
                  <Button
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      ref.current?.scrollTo({ index: guideTextIndex + 1 })
                      setGuideTextIndex(guideTextIndex + 1)
                    }}
                  >
                    <Icon name="next" />
                  </Button>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ModalWrapper>
    </>
  )
}

export default DownloadGuide
