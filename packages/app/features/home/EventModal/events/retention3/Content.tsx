import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
  styled,
  useResponsiveValue,
} from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { memo, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { IResponse } from 'services/common/types'
import { useClaimEventCoinMutation } from 'services/rewardApi'
import { ClaimEventCoinResult } from 'services/rewardApi.type'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import { useHomeEventModal } from '../../HomeEventModal'
import Montserrat from 'app/assets/fonts/Montserrat'

type Props = {}

const Retention3Content = memo(({}: Props) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const [redeemCoin, { isLoading: isRequesting }] = useClaimEventCoinMutation()
  const { width, height } = useHomeEventModal().dimension
  const [isLoading, setLoading] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const [amount, setAmount] = useState('')
  const { closeModal } = useModal()
  const treasureHeight = useResponsiveValue([100, 120])

  const imageWidth = Math.min(450, width * 0.95)
  const imageHeight = imageWidth / (900 / 1100)

  const gotoRewards = () => {
    closeModal(undefined, () => push('/rewards/redeem/list'))
  }

  async function redeem() {
    setRedeemed(!redeemed)
    const { data, success } = await redeemCoin('retention3')
      .unwrap()
      .catch((e: IResponse<ClaimEventCoinResult>) => {
        closeModal()
        return e
      })

    if (success && data) {
      setAmount(data.coin_amount)
      setRedeemed(true)
    } else {
      closeModal()
    }
  }

  return (
    <View sx={{ height: Math.min(height, imageHeight) }}>
      <ScrollView bounces={false}>
        <ImageBackground
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention3/glow.png`,
          }}
          style={{
            width: imageWidth,
            height: imageHeight,
            alignItems: 'center',
          }}
        >
          <AnimatePresence>
            {redeemed ? (
              <MotiView
                key="open"
                from={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exitTransition={{
                  type: 'timing',
                  duration: 250,
                }}
              >
                <View
                  sx={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CongratsText sx={{ position: 'absolute' }}>
                    {t('event.won')}
                  </CongratsText>
                </View>

                <View sx={{ alignItems: 'center' }}>
                  <SolitoImage
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention3/treasure-open.png`}
                    alt=""
                    width={imageWidth}
                    height={imageHeight / 1.4}
                  />

                  <View
                    sx={{
                      position: 'absolute',
                      top: '20%',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      sx={{
                        mt: FONT_TOP_OFFSET,
                        fontWeight: 'bold',
                        fontSize: [18, 20],
                      }}
                    >
                      {t('retention.receive')}
                    </Text>

                    <View sx={{ mt: '$2' }}>
                      {amount ? (
                        <Row sx={{ alignItems: 'center' }}>
                          <Text
                            sx={{
                              mt: FONT_TOP_OFFSET,
                              alignSelf: 'center',
                              mr: ['$1', '$1', '$2', '$2'],
                              fontWeight: 'bold',
                              fontSize: [18, 18, 18, 32],
                            }}
                          >
                            {amount}
                          </Text>
                          <SolitoImage
                            src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`}
                            height={25}
                            width={25}
                            alt=""
                          />
                        </Row>
                      ) : (
                        <ActivityIndicator color="$primary.100" />
                      )}
                    </View>
                  </View>
                </View>
              </MotiView>
            ) : (
              <MotiView
                key="close"
                from={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exitTransition={{
                  type: 'timing',
                  duration: 250,
                }}
                style={{ alignItems: 'center' }}
              >
                <View
                  sx={{
                    height: treasureHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SolitoImage
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention3/scroll.png`}
                    alt=""
                    width={imageWidth}
                    height={treasureHeight}
                  />

                  <ScrollText sx={{ position: 'absolute' }}>
                    {t('retention.claim')}
                  </ScrollText>
                </View>

                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention3/treasure-close.png`}
                  alt=""
                  width={imageWidth / 1.3}
                  height={imageHeight / 1.8}
                />
              </MotiView>
            )}

            <View sx={{ flex: 1, justifyContent: 'flex-end' }}>
              <Pressable
                onPress={() => (redeemed ? gotoRewards() : redeem())}
                disabled={isRequesting}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention3/green-button.png`}
                  alt=""
                  height={80}
                  width={200}
                />
                <View
                  sx={{
                    position: 'absolute',
                  }}
                >
                  {isRequesting ? (
                    <ActivityIndicator color="$primary.100" />
                  ) : (
                    <ButtonText>
                      {redeemed
                        ? t('common.playNow').toUpperCase()
                        : t('retention.redeem').toUpperCase()}
                    </ButtonText>
                  )}
                </View>
              </Pressable>
            </View>
          </AnimatePresence>

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
        </ImageBackground>
      </ScrollView>
    </View>
  )
})

const ContainerView = styled(AnimatePresence)({
  flex: 1,
  alignItems: 'center',
})

const BoldText = styled(Text)({
  fontFamily: Montserrat.Black.name,
  width: 180,
  fontSize: 24,
  textAlign: 'center',
  lineHeight: 28,
})

const ScrollText = styled(BoldText)({
  color: '#753E28',
})

const ButtonText = styled(BoldText)({
  color: '#217000',
})

const CongratsText = styled(BoldText)({
  width: 350,
  fontSize: 32,
  color: '#FFBA00',
  lineHeight: 40,
})

export default Retention3Content
