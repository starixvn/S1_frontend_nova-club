import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { styled, View, Text, ScrollView } from 'dripsy'

import { AnimatePresence, MotiImage, MotiView } from 'moti'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { useLuckySpinMutation } from 'services/playerApi'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'
import { MotifiedImage } from '../common/Image'
import IconButton from '../form/IconButton'

const LION_HEAD_HEIGHT = 100
const BODY_HEIGHT = 350
const BODY_PADDING = 12
const SCROLL_ROD_HEIGHT = 30

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
const RedPacket = ({ prize, winNote }) => {
  return (
    <>
      <RedPacketContainer
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 500,
          delay: 1500,
        }}
      >
        <YellowImage
          from={{ height: 0, transform: [{ translateY: 0 }] }}
          animate={{ height: 70, transform: [{ translateY: -70 }] }}
          transition={{ type: 'timing', duration: 750, delay: 2500 }}
          exit={{ height: 0 }}
          source={require('app/assets/images/events/cny/win.png')}
        />
        <AngpaoWinAmountContainer
          from={{ transform: [{ translateY: 0 }], opacity: 0 }}
          animate={{ transform: [{ translateY: -70 }], opacity: 1 }}
          transition={{ type: 'timing', duration: 1000, delay: 3500 }}
        >
          <AngpaoWinAmount>{prize}</AngpaoWinAmount>
        </AngpaoWinAmountContainer>

        <RedCoverContainer
          sx={{ zIndex: 1 }}
          from={{
            transform: [{ translateY: 0 }, { scaleY: 1 }],
          }}
          animate={{
            transform: [{ translateY: -100 }, { scaleY: -1 }],
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 1500,
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
            duration: 1000,
            delay: 3500,
          }}
        >
          <AngpaoWinNote>{winNote}</AngpaoWinNote>
        </CongratulationTextContainer>
        <AngpaoBody
          source={require('app/assets/images/events/cny/front.png')}
        />
      </RedPacketContainer>
    </>
  )
}

const DrawRedPacket = ({ handleAngpao, disablePacket }: any) => {
  let timingDelay = 1000

  return (
    <DrawAngpaoContainer
      from={{ opacity: 0.5, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        type: 'timing',
        duration: 1000,
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

      <ScrollContentContainer
        from={{ height: 0 }}
        animate={{ height: BODY_HEIGHT }}
        exit={{ height: 0 }}
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
              delay: 1000,
            }}
          >
            <DrawAngpaoWelcomeText sx={{ paddingTop: 30 }} numberOfLines={2}>
              Chọn Bao Lì Xì May
            </DrawAngpaoWelcomeText>
            <DrawAngpaoWelcomeText sx={{ paddingBottom: 10 }} numberOfLines={2}>
              Mắn Của Bạn
            </DrawAngpaoWelcomeText>
          </MotiView>

          <ScrollAngpaoListContainer>
            {AngpaoList?.map((d, index) => {
              timingDelay = timingDelay + 200
              return (
                <TouchableWithoutFeedback
                  key={d.text}
                  onPress={() => handleAngpao()}
                  disabled={disablePacket}
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
                </TouchableWithoutFeedback>
              )
            })}
          </ScrollAngpaoListContainer>
        </View>
        <ScrollBody
          from={{ height: 0 }}
          animate={{ height: BODY_HEIGHT }}
          transition={{ type: 'timing', duration: 1500 }}
          exit={{ height: 0 }}
          exitTransition={{ type: 'timing', duration: 2000 }}
          source={require('app/assets/images/events/cny/SCROLL_BODY.jpg')}
        />
      </ScrollContentContainer>

      <ScrollTopDown>
        <ScrollFixTopImage
          source={require('app/assets/images/events/cny/SCROLL_TOP.png')}
        />
      </ScrollTopDown>
    </DrawAngpaoContainer>
  )
}

const LoadingAngpaoView = ({ loading }) => {
  const { height } = useContainerDimension()
  const loadingHeight = height
  return loading ? (
    <AnimatePresence>
      <LoadingAngpaoContainer
        from={{ opacity: 0, translateY: 250 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 250 }}
        transition={{ type: 'timing' }}
        style={{ height: loadingHeight }}
      >
        <MotiView style={{ transform: [{ translateY: -loadingHeight / 2 }] }}>
          <ActivityIndicator color="white" size={100} sx={{ m: '$5' }} />
        </MotiView>
      </LoadingAngpaoContainer>
    </AnimatePresence>
  ) : null
}
const CnyLuckyDrawModal = ({ modal: { closeModal } }) => {
  const dispatch = useDispatch()

  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disablePacket, setDisablePacket] = useState(false)
  const [spinLuckyWheel] = useLuckySpinMutation()
  const [prize, setPrize] = useState('')
  const [winNote, setWinNote] = useState('')
  const luckyDrawBalance =
    useAppSelector((s) => s.setting.luckyDrawBalance) ?? ''
  const locale = useAppSelector((s) => s.setting.locale) ?? ''
  const [getPlayerBalance] = useLazyPlayerBalanceQuery()
  const { showAlert } = useAlert()

  const spin = useCallback(async () => {
    try {
      const { data, success, message } = await spinLuckyWheel().unwrap()

      if (success && data) {
        setLoading(false)
        setVisible(true)
        dispatch(SettingActions.setLuckyDrawBalance(luckyDrawBalance - 1)) // this is to trigger the memoized wheel
        setTimeout(() => {
          const prizePositionNote = locale === 'en' ? 2 : 4
          const splitNote = data.note.split(' ')
          setPrize(splitNote[prizePositionNote] ?? '')
          setWinNote(data.note)
          getPlayerBalance()
        }, 4000)
      } else {
        setLoading(false)
        setVisible(false)
        showAlert(message)
      }
    } catch (err) {
      setLoading(false)
      setVisible(false)
      showAlert(err)
    }
  }, [dispatch, getPlayerBalance, luckyDrawBalance, showAlert, spinLuckyWheel])

  const handleClose = () => {
    closeModal('CnyLuckyDrawModal', () => {
      dispatch(SettingActions.setLuckyDrawBalance(0))
    })
  }

  const handleAngpao = useCallback(() => {
    setDisablePacket(true)
    setLoading(true)
    spin()
  }, [])

  const { top, bottom } = useSafeArea()
  return (
    <OverlayContainer
      sx={{
        width,
        height,
        paddingTop: top,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexDirection: isLandscape ? 'row' : 'column',
          flexGrow: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: bottom + BODY_PADDING,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <AnimatePresence>
          {!visible ? (
            <DrawRedPacket
              key={'DrawRedPacket'}
              handleAngpao={handleAngpao}
              disablePacket={disablePacket}
            />
          ) : (
            <RedPacket key={'redPacket'} prize={prize} winNote={winNote} />
          )}
        </AnimatePresence>
        <LoadingAngpaoView loading={loading} />
      </ScrollView>

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
  top: '35%',
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
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
})

const AngpaoWinAmountContainer = styled(MotiView)({
  zIndex: 20,
  alignItems: 'center',
})

const AngpaoWinNote = styled(Text)({
  textAlign: 'center',
  paddingTop: 10,
  fontSize: 20,
  color: '#ffcc02',
  fontWeight: 'bold',
  marginX: 5,
})

const AngpaoWinAmount = styled(Text)({
  position: 'absolute',
  textAlign: 'center',
  color: 'red',
  fontWeight: 'bold',
  fontSize: 30,
  marginTop: 20,
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
const DrawAngpaoContainer = styled(MotiView)({
  alignItems: 'center',
})

const LionContainer = styled(View)({
  zIndex: 10,
  position: 'absolute',
  top: -LION_HEAD_HEIGHT,
})
const LionImage = styled(Image)({
  height: 120,
  aspectRatio: 5 / 4,
  zIndex: 10,
})
const ScrollFixTop = styled(View)({
  marginX: 'auto',
  alignItems: 'center',
  zIndex: 5,
  marginTop: LION_HEAD_HEIGHT + BODY_PADDING,
})
const ScrollFixTopImage = styled(Image)({
  height: SCROLL_ROD_HEIGHT,
  aspectRatio: 10 / 1,
})

const ScrollTopDown = styled(MotiView)({
  zIndex: 2,
  marginX: 'auto',
  marginTop: -4,
})

const ScrollBody = styled(MotiImage)({
  minWidth: 280,
  aspectRatio: 7 / 9,
  backgroundColor: 'red',
})

const DrawAngpaoWelcomeText = styled(Text)({
  textAlign: 'center',
  color: '#932222',
  fontWeight: 'bold',
  fontSize: 25,
})

const ScrollContentContainer = styled(MotiView)({
  zIndex: 2,
  alignItems: 'center',
  marginX: 'auto',
  marginTop: -6,
  overflow: 'hidden',
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

const LoadingAngpaoContainer = styled(MotiView)({
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(18, 55, 88, 0.7)',
})

const CloseButtonContainer = styled(View)({
  position: 'absolute',
  top: '8%',
  right: '10%',
})

export default CnyLuckyDrawModal
