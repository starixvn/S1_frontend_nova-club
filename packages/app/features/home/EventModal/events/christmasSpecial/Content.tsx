import { FONT_TOP_OFFSET } from 'app/constants/font'
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'dripsy'
import { MotiImage, MotiView } from 'moti'
import React, { useMemo, useState } from 'react'
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
import { useHomeEventModal } from '../../HomeEventModal'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {}

export default function ChristmasSpecialContent({}: Props) {
  const { push } = useRouter()
  const [redeemCoin, { isLoading: isRequesting }] =
    useClaimChristmasEventCoinMutation()
  const { data: eventCode } = useGetChristmasEventCoinQuery()

  const { width, height } = useHomeEventModal().dimension
  const [isLoading, setLoading] = useState(true)
  const [redeemed, setRedeemed] = useState(false)
  const [success, setSuccess] = useState(false)
  const [amount, setAmount] = useState('')
  const { closeModal } = useModal()

  const imageWidth = Math.min(450, width * 0.95)
  const imageHeight = imageWidth / (900 / 1100)

  const gotoRewards = () => {
    closeModal(undefined, () => push('/rewards/redeem/list'))
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
                            source={{
                              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`,
                            }}
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
