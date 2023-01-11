import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { styled, View } from 'dripsy'

import { AnimatePresence, MotiImage, MotiView, Text } from 'moti'
import { memo, useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground } from 'react-native'
import { useEvent } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useLuckySpinMutation } from 'services/playerApi'
import { MotifiedImage } from '../common/Image'
import IconButton from '../form/IconButton'

const AngpaoList = [
  {
    text: 'PHUC',
    image: require('app/assets/images/events/cny/phuc.png'),
  },
  {
    text: 'TET',
    image: require('app/assets/images/events/cny/tet.png'),
  },
  {
    text: 'THO',
    image: require('app/assets/images/events/cny/tho.png'),
  },
  {
    text: 'TAI',
    image: require('app/assets/images/events/cny/tai.png'),
  },
  {
    text: 'XUAN',
    image: require('app/assets/images/events/cny/xuan.png'),
  },
  {
    text: 'LOC',
    image: require('app/assets/images/events/cny/loc.png'),
  },
]
const RedPacket = ({ prize }) => {
  const winCredit = 38
  return (
    <>
      <RedPacketContainer
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 1500,
          delay: 3000,
        }}
      >
        <YellowImage
          from={{ height: 0, transform: [{ translateY: 0 }] }}
          animate={{ height: [0, 70], transform: [{ translateY: [0, -70] }] }}
          transition={{ type: 'timing', duration: 1000, delay: 2000 }}
          exit={{ height: 0 }}
          exitTransition={{ type: 'timing', duration: 5000 }}
          source={require('app/assets/images/events/cny/win.png')}
        />
        <MotiView
          style={{ zIndex: 12, alignItems: 'center' }}
          from={{ transform: [{ translateY: 0 }] }}
          animate={{ transform: [{ translateY: [0, -70] }] }}
          transition={{ type: 'timing', duration: 1000, delay: 2000 }}
        >
          <Text
            style={{
              position: 'absolute',
              textAlign: 'center',
              color: 'red',
              fontWeight: '900',
              fontSize: 30,
              marginTop: 20,
            }}
          >
            {winCredit} K
          </Text>
        </MotiView>

        <RedCoverContainer
          sx={{ zIndex: 1 }}
          animate={{
            transform: [
              {
                translateY: [0, -100],
              },
              { scaleY: [1, -1] },
            ],
          }}
          transition={{
            type: 'timing',
            duration: 2000,
          }}
        >
          <RedCover
            source={require('app/assets/images/events/cny/cover.png')}
          />
        </RedCoverContainer>
        <CongratulationTextContainer
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 2500,
            delay: 8000,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              paddingTop: 10,
              color: '#ffcc02',
              fontWeight: '900',
              marginHorizontal: 30,
            }}
          >
            Xin chúc mừng! VND{winCredit}K đã được thêm vào ví của bạn
          </Text>
        </CongratulationTextContainer>
        <AngpaoBody
          source={require('app/assets/images/events/cny/front.png')}
        />
      </RedPacketContainer>
    </>
  )
}

const DrawRedPacket = memo(({ handleAngpao, visible, key }: any) => {
  let timingDelay = 2000
  console.log('Rerender Draw Red Packet')

  useEffect(() => {
    console.log('Re-Create Draw rED')
  }, [])

  return (
    <MotiView
      style={{
        position: 'absolute',
        top: '28%',
        alignItems: 'center',
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        type: 'timing',
        duration: 3000,
      }}
    >
      <ScrollFixTop>
        <LionContainer>
          <LionImage
            source={require('app/assets/images/events/cny/LION.png')}
          />
        </LionContainer>
        <ScrollFixTopImage
          source={require('app/assets/images/events/cny/SCROLL_TOP.png')}
        />
      </ScrollFixTop>
      <MotiView
        style={{
          zIndex: 1,
          position: 'absolute',
          top: '27%',
          marginHorizontal: 'auto',
        }}
        animate={{
          transform: [{ translateY: [0, 365] }],
        }}
        exit={{
          transform: [{ translateY: 0 }],
        }}
        transition={{ type: 'timing', duration: 1500 }}
        exitTransition={{ type: 'timing', duration: 3000 }}
      >
        <ScrollFixTopImage
          source={require('app/assets/images/events/cny/SCROLL_TOP.png')}
        />
      </MotiView>
      <ScrollContentContainer
        animate={{ height: [0, 400] }}
        transition={{ type: 'timing', duration: 1500 }}
      >
        <View
          style={{
            position: 'absolute',
            zIndex: 5,
          }}
        >
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            exitTransition={{ duration: 500, type: 'timing', delay: 0 }}
            transition={{
              type: 'timing',
              duration: 2500,
              delay: 2000,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 30,
                color: '#932222',
                fontWeight: 'bold',
                fontSize: 25,
              }}
              numberOfLines={2}
            >
              Chọn Bao Lì Xì May
            </Text>
            <Text
              style={{
                textAlign: 'center',
                paddingBottom: 10,
                color: '#932222',
                fontWeight: 'bold',
                fontSize: 25,
              }}
              numberOfLines={2}
            >
              Mắn Của Bạn
            </Text>
          </MotiView>

          <ScrollAngpaoListContainer>
            {AngpaoList?.map((d, index) => {
              timingDelay = timingDelay + 200
              return (
                <TouchableOpacity
                  key={d.text}
                  onPress={() => handleAngpao()}
                  disabled={visible}
                >
                  <MotiView
                    from={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 2000,
                      delay: timingDelay,
                    }}
                    exit={{ opacity: 0 }}
                    exitTransition={{
                      duration: 500,
                      type: 'timing',
                      delay: 0,
                    }}
                  >
                    <ImageBackground
                      resizeMode="cover"
                      source={require('app/assets/images/events/cny/ANGPAO.png')}
                      style={{
                        aspectRatio: 7 / 10,
                        height: 110,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MotifiedImage
                        style={{ aspectRatio: 10 / 7, height: 23 }}
                        source={d.image}
                      />
                    </ImageBackground>
                  </MotiView>
                </TouchableOpacity>
              )
            })}
          </ScrollAngpaoListContainer>
        </View>
        <ScrollBody
          animate={ScrollBodyAnimation.animate}
          transition={ScrollBodyAnimation.transition}
          exit={{ height: 0 }}
          exitTransition={{ type: 'timing', duration: 3000 }}
          source={require('app/assets/images/events/cny/SCROLL_BODY.jpg')}
        />
      </ScrollContentContainer>
    </MotiView>
  )
})
DrawRedPacket.displayName = 'DrawRedpacket'

const LoadingAngpaoView = ({ loading }) => {
  const { height } = useContainerDimension()
  const loadingHeight = height
  console.log('loadingAngpaoViewm:', loading)
  return loading ? (
    <AnimatePresence>
      <MotiView
        from={{ opacity: 0, translateY: 250 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 250 }}
        transition={{ type: 'timing' }}
        style={{
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'absolute',
          left: 0,
          right: 0,
          height: loadingHeight,
          bottom: 0,
          backgroundColor: 'rgba(18, 55, 88, 0.7)',
        }}
      >
        <MotiView style={{ transform: [{ translateY: -loadingHeight / 2 }] }}>
          <ActivityIndicator color="white" size={100} sx={{ m: '$5' }} />
        </MotiView>
      </MotiView>
    </AnimatePresence>
  ) : null
}
const CnyLuckyDrawModal = ({ modal: { closeModal } }) => {
  const dispatch = useDispatch()

  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [spinLuckyWheel] = useLuckySpinMutation()
  const [prize, setPrize] = useState('')
  const [first, setfirst] = useState(false)

  const spin = useCallback(async () => {
    console.log('spin')
    // setLoading(true)
    const { data, success } = await spinLuckyWheel()
      .unwrap()
      .catch((error) => {
        setLoading(false)
        setVisible(true)
        return error
      })

    console.log('what data:', data?.data)
    // setLoading(false)
    // setVisible(true)
    if (success) {
      console.log('success')
      dispatch(SettingActions.setLuckyDrawBalance(0)) // this is to trigger the memoized wheel
      // setSpinBalance((prev) => prev + 1)

      setTimeout(() => {
        // showAlert({
        //   message: data.code === 4 ? t('status.luckyThankYou') : data.note,
        //   onClose: () => {R
        //     setTimeout(() => handleClose(), 500)
        //   },
        //   persistent: true,
        // })
        setLoading(false)
        // setVisible(visible)
      }, 5500)
    }
  }, [dispatch, spinLuckyWheel])
  const handleSpinMapping = (code: number) => {
    switch (code) {
      case 1:
        return '5'
      case 2:
        return '10'
      case 3:
        return '18'
      default:
        return '0'
    }
  }

  const handleClose = () => {
    closeModal('CnyLuckyDrawModal', () => {
      dispatch(SettingActions.setLuckyDrawBalance(0))
    })
  }

  const handleAngpao = useCallback(() => {
    setLoading(true)
    // setVisible(true)
    spin()
    // setLoading(false)
  }, [])

  useEffect(() => {
    console.log('Modal Recreate')
  }, [])

  console.log('Rerender Modal', visible)
  const { top } = useSafeArea()
  return (
    <OverlayContainer sx={{ width, height, paddingTop: top }}>
      <View
        sx={{
          flexDirection: isLandscape ? 'row' : 'column',
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: 'red' }}
          onPress={() => {
            setfirst((dummy) => !dummy)
          }}
        >
          <Text>Press jhere</Text>
        </TouchableOpacity>
        <AnimatePresence>
          {!visible ? (
            <DrawRedPacket
              key={'DrawRedPacket'}
              handleAngpao={handleAngpao}
              visible={visible}
            />
          ) : (
            <RedPacket key={'redPacket'} prize={prize} />
          )}
        </AnimatePresence>
        <LoadingAngpaoView loading={loading} />
      </View>

      {!loading ? (
        <CloseButtonContainer>
          <IconButton
            onPress={handleClose}
            name="cross"
            color="white"
            sx={{
              right: 0,
              zIndex: 10,
            }}
            size={30}
          />
        </CloseButtonContainer>
      ) : null}
    </OverlayContainer>
  )
}

const ScrollBodyAnimation = {
  animate: {
    height: [0, 350],
  },
  transition: {
    type: 'timing',
    duration: 1500,
  },
}
const ScrollTopAnimation = {
  animate: {
    transform: [
      {
        translateY: [0, 365],
      },
    ],
  },
  transition: {
    type: 'timing',
    duration: 1500,
  },
}

const ScrollContentContainerAnimation = {
  animate: {
    height: [0, 400],
  },
  transition: {
    type: 'timing',
    duration: 1500,
  },
}

const OverlayContainer = styled(View)({
  bg: 'rgba(18, 55, 88, 0.2)',
  position: 'relative',
  top: 0,
})

//RedPacket Style
const RedPacketContainer = styled(MotiView)({
  zIndex: 2,
  alignItems: 'center',
  position: 'absolute',
  top: '30%',
  marginX: 'auto',
})
const RedCoverContainer = styled(MotiView)({
  position: 'absolute',
  marginX: 'auto',
})

const RedCover = styled(MotifiedImage)({
  height: 103,
  aspectRatio: 2 / 1,
})

const AngpaoBody = styled(MotifiedImage)({
  zIndex: 2,
  height: 250,
  width: 200,
})

const YellowImage = styled(MotiImage)({
  zIndex: 12,
  position: 'absolute',
  width: 180,
  height: 0,
})

const CongratulationTextContainer = styled(MotiView)({
  justifyContent: 'center',
  position: 'absolute',
  marginX: 'auto',
  zIndex: 3,
  maxWidth: 200,
  height: '100%',
})

// Angpao Picker Style
const LionContainer = styled(View)({
  zIndex: 10,
  position: 'absolute',
  top: -100,
})
const LionImage = styled(Image)({
  height: 120,
  aspectRatio: 5 / 4,
  zIndex: 10,
})
const ScrollFixTop = styled(View)({
  position: 'absolute',
  top: '27%',
  marginX: 'auto',
  alignItems: 'center',
  zIndex: 5,
})
const ScrollFixTopImage = styled(Image)({
  height: 30,
  aspectRatio: 10 / 1,
})

const ScrollBody = styled(MotiImage)({
  minWidth: 280,
  aspectRatio: 7 / 9,
})

const ScrollContentContainer = styled(MotiView)({
  zIndex: 2,
  alignItems: 'center',
  position: 'absolute',
  top: 25,
  marginX: 'auto',
})

const ScrollAngpaoListContainer = styled(View)({
  minWidth: 280,
  maxHeight: 250,
  aspectRatio: 7 / 9,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  paddingX: 10,
})
const CloseButtonContainer = styled(View)({
  position: 'absolute',
  top: '8%',
  right: '10%',
})

export default CnyLuckyDrawModal
