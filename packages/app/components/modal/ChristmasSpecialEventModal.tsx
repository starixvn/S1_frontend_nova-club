import { FONT_TOP_OFFSET } from 'app/constants/font'
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
import { MotiImage, MotiView } from 'moti'
import { useMemo, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { IResponse } from 'services/common/types'
import {
  useClaimChristmasEventCoinMutation,
  useGetChristmasEventCoinQuery,
} from 'services/rewardApi'
import { ClaimChristmasEventCoinResult } from 'services/rewardApi.type'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import Icon from '../Icon'
import Image from '../common/Image'

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

const ChristmasSpecialEventModal = ({ modal: { closeModal } }) => {
  const { push } = useRouter()
  const [redeemCoin, { isLoading: isRequesting }] =
    useClaimChristmasEventCoinMutation()
  const { data: eventCode } = useGetChristmasEventCoinQuery()

  const { width, height } = useContainerDimension()
  const [isLoading, setLoading] = useState(true)
  const [redeemed, setRedeemed] = useState(false)
  const [success, setSuccess] = useState(false)
  const [amount, setAmount] = useState('')

  const imageWidth = Math.min(450, width * 0.7)
  const imageHeight = imageWidth / (900 / 1100)

  const gotoRewards = () => {
    closeModal('ChristmasSpecialEventModal', () => push('/rewards/redeem/list'))
  }

  async function redeem() {
    const { data, success } = await redeemCoin(eventCode ?? '')
      .unwrap()
      .catch((e: IResponse<ClaimChristmasEventCoinResult>) => {
        return e
      })
      .finally(() => setRedeemed(true))

    if (success) {
      data && setAmount(data.amount)
      setSuccess(true)
    } else setSuccess(false)
  }

  const motiFailedImage = useMemo(
    () => (
      <MotiView
        key={'failed'}
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <SolitoImage
          src={require('app/assets/images/events/christmas/bg-failed.png')}
          alt=""
          fill
        />
      </MotiView>
    ),
    []
  )

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
              {success ? (
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
                      height: '16%',
                    }}
                  >
                    <View
                      sx={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {amount ? (
                        <>
                          <Text
                            sx={{
                              mt: FONT_TOP_OFFSET,
                              alignSelf: 'center',
                              mr: ['$1', '$1', '$2', '$2'],
                              fontWeight: 'bold',
                              fontSize: [18, 18, 18, 22],
                            }}
                          >
                            {amount}
                          </Text>
                          <Image
                            source={require('app/assets/images/rewards/coin.png')}
                            style={{
                              height: '70%',
                              width: 25,
                            }}
                            resizeMode="contain"
                            alt=""
                          />
                        </>
                      ) : (
                        <ActivityIndicator color="$primary.100" />
                      )}
                    </View>
                    <Pressable onPress={gotoRewards}>
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
              ) : (
                <>{motiFailedImage}</>
              )}
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
                  <Pressable
                    onPress={redeem}
                    disabled={isRequesting}
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
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
                      }}
                    >
                      {isRequesting ? (
                        <ActivityIndicator color="$primary.100" />
                      ) : (
                        <Image
                          source={require('app/assets/images/events/christmas/redeem.png')}
                          sx={{
                            width: imageWidth / 3.5,
                            height: imageWidth / 3.5,
                          }}
                          resizeMode="contain"
                          alt="close"
                        />
                      )}
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
              <ActivityIndicator size="large" color="$primary.100" />
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
        <Icon name="tnc" size={27} />
      </Pressable>

      <Pressable onPress={handleClose}>
        <Icon name="cross" size={25} />
      </Pressable>
    </View>
  )
}

export default ChristmasSpecialEventModal
