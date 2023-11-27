import GenericContainer from 'app/features/rewards/tnc/component/GenericContainer'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
} from 'dripsy'
import { MotiImage } from 'moti'
import { useState } from 'react'
import { ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Image from '../common/Image'
import { useRouter } from 'solito/router'
import { useClaimEventCoinMutation } from 'services/rewardApi'
import useAlert from 'app/hooks/useAlert'

const list = [
  'rewards.tnc.christmas.tnc.n1',
  'rewards.tnc.christmas.tnc.n2',
  'rewards.tnc.christmas.tnc.n3',
  'rewards.tnc.christmas.tnc.n4',
  'rewards.tnc.christmas.tnc.n5',
  'rewards.tnc.christmas.tnc.n6',
  'rewards.tnc.christmas.tnc.n7',
  'rewards.tnc.christmas.tnc.n8',
]

const ChristmasGiftModal = ({ modal: { closeModal } }) => {
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const [redeemCoin] = useClaimEventCoinMutation()
  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)
  const [redeemed, setRedeemed] = useState(false)
  const [amount, setAmount] = useState('')

  const imageWidth = Math.min(450, width * 0.7)
  const imageHeight = imageWidth / (900 / 1100)

  const handleClose = () => {
    closeModal()
    push('/rewards')
  }

  async function redeem() {
    const { data, success, message } = await redeemCoin('upload2').unwrap()

    if (success && data) {
      setAmount(data.coin_amount)
      setRedeemed(true)
    } else {
      showAlert(message)
    }
  }

  return (
    <View
      sx={{
        height: Math.min(height, imageHeight),
      }}
    >
      <ScrollView bounces={false}>
        <View
          sx={{
            width: imageWidth,
            height: imageHeight,
            alignItems: 'center',
          }}
        >
          {redeemed ? (
            <>
              <ImageBackground
                source={require('app/assets/images/events/christmas/redeemed-bg.png')}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}
                onLoadEnd={() => setLoading(false)}
                resizeMode="contain"
                alt=""
              >
                <View
                  sx={{
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: '30%',
                  }}
                >
                  <View
                    sx={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    {amount ? (
                      <>
                        <Text
                          sx={{
                            alignSelf: 'center',
                            mr: 10,
                            lineHeight: 30,
                            fontWeight: 'bold',
                            fontSize: 20,
                          }}
                        >
                          {amount}
                        </Text>
                        <Image
                          source={require('app/assets/images/events/christmas/coin.png')}
                          style={{
                            width: 25,
                            height: 25,
                          }}
                          resizeMode="contain"
                          alt=""
                        />
                      </>
                    ) : (
                      <View
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ActivityIndicator
                          size="large"
                          color="$primary.100"
                          sx={{ position: 'absolute' }}
                        />
                      </View>
                    )}
                  </View>
                  <Pressable onPress={handleClose}>
                    <MotiImage
                      source={require('app/assets/images/events/christmas/button-bg.png')}
                      style={{
                        width: imageWidth / 3.5,
                        height: imageWidth / 10,
                      }}
                      resizeMode="contain"
                      animate={{
                        rotate: [
                          { value: '-2deg', duration: 0.1 },
                          { value: '2deg', duration: 0.1 },
                        ],
                      }}
                      transition={{ loop: true, duration: 1 }}
                    />
                    <View
                      sx={{
                        position: 'absolute',
                        bottom: '-65%',
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Image
                        source={require('app/assets/images/events/christmas/playNow.png')}
                        sx={{
                          width: imageWidth / 4.5,
                          height: imageWidth / 4.5,
                          alignSelf: 'center',
                          justifySelf: 'center',
                        }}
                        resizeMode="contain"
                        alt="close"
                      />
                    </View>
                  </Pressable>
                </View>
              </ImageBackground>
              <ActionButton handleClose={() => closeModal()} />
            </>
          ) : (
            <>
              <ImageBackground
                source={require('app/assets/images/events/christmas/bg.png')}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}
                onLoadEnd={() => setLoading(false)}
                resizeMode="contain"
                alt=""
              >
                <View
                  sx={{
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: '18%',
                  }}
                >
                  <Pressable onPress={redeem}>
                    <MotiImage
                      source={require('app/assets/images/events/christmas/button-bg.png')}
                      style={{
                        width: imageWidth / 3,
                        height: imageWidth / 3,
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                      animate={{
                        rotate: [
                          { value: '-2deg', duration: 0.1 },
                          { value: '2deg', duration: 0.1 },
                        ],
                      }}
                      transition={{ loop: true, duration: 1 }}
                    />
                    <View
                      sx={{
                        position: 'absolute',
                        bottom: '7%',
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Image
                        source={require('app/assets/images/events/christmas/redeem.png')}
                        sx={{
                          width: imageWidth / 3.5,
                          height: imageWidth / 3.5,
                          alignSelf: 'center',
                          justifySelf: 'center',
                        }}
                        resizeMode="contain"
                        alt="close"
                      />
                    </View>
                  </Pressable>
                </View>
              </ImageBackground>
              <ActionButton handleClose={() => closeModal()} />
            </>
          )}
          {isLoading ? (
            <View
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator
                size="large"
                color="$primary.100"
                sx={{ position: 'absolute' }}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

type ActionButtonProps = {
  handleClose?: () => void
}

const ActionButton = ({ handleClose }: ActionButtonProps) => {
  const { openModal } = useModal()
  const { t } = useLocalization()
  return (
    <View
      sx={{
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Pressable
        onPress={() =>
          openModal('RewardTncModal', {
            content: (
              <GenericContainer>
                <Text sx={{ fontSize: 14, fontWeight: 'bold' }}>
                  {t('rewards.tnc.christmas.eventTitle')}
                </Text>
                <Text sx={{ fontSize: 14, fontWeight: 'bold' }}>
                  {t('rewards.tnc.christmas.period')}
                </Text>
                <View sx={{ pt: '$2' }}>
                  {list.map((text, index) => {
                    return (
                      <Row key={index}>
                        <Text sx={{ pr: '$2' }}>{index + 1}</Text>
                        <Text>{t(text)}</Text>
                      </Row>
                    )
                  })}
                </View>
              </GenericContainer>
            ),
          })
        }
      >
        <Image
          source={require('app/assets/images/events/christmas/tncBtn.png')}
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          alt="tncBtn"
        />
      </Pressable>

      <Pressable onPress={handleClose}>
        <Image
          source={require('app/assets/images/events/christmas/close.png')}
          style={{
            width: 25,
            height: 25,
          }}
          resizeMode="contain"
          alt="close"
        />
      </Pressable>
    </View>
  )
}

export default ChristmasGiftModal
