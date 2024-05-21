import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { getErrorMessage } from 'app/utils/validation'
import {
  ActivityIndicator,
  Pressable,
  Row,
  Text,
  View,
  styled,
  useResponsiveValue,
} from 'dripsy'
import React, { ComponentProps, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  useCheckInDailyCoinMutation,
  useGetDailyCoinQuery,
} from 'services/rewardApi'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

type BoxProps = {
  day: number
  claimed?: number
  reward: string
  active?: boolean
}

interface CheckInBoxProps {
  children?: React.ReactNode
}

const CheckInBox = ({ children }: CheckInBoxProps) => {
  const [CheckIn, { isUninitialized, isError, isSuccess }] =
    useCheckInDailyCoinMutation()

  const { data } = useGetDailyCoinQuery(undefined, {
    skip: !isError && !isSuccess,
  })

  const { data: profileData } = usePlayerProfileQuery(undefined, {})

  const enableCheckIn = !profileData?.disabled_event ?? false

  const [message, setMessage] = useState('')
  const { push } = useRouter()
  const { closeModal } = useModal()
  const { t } = useLocalization()
  const GAP_VALUE = useResponsiveValue([6, 10])

  const coinData = data ? data.daily_setting.map((e) => e.coin) : []
  const dayClaimed = data?.checked_in ? data.day : (data?.day ?? 0) - 1

  useEffect(() => {
    async function autoCheckIn() {
      const res = await CheckIn()
        .unwrap()
        .catch((error) => {
          setMessage(error.message.replace('\n', ''))
        })
    }

    autoCheckIn()
  }, [])

  const handleGoToDeposit = () => {
    closeModal()
    push('/deposit')
  }

  return (
    <>
      <View sx={{ width: ['90%', '80%'], maxWidth: 500 }}>
        <View
          sx={{
            backgroundColor: '$primary.300',
            p: 20,
            borderRadius: 15,
          }}
        >
          <CheckInText sx={{ mb: 20 }}>
            {t('rewards.checkInModal.topDesc')}
          </CheckInText>
          {enableCheckIn ? (
            <Row sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {coinData.length > 0 ? (
                coinData.map((e, i) => {
                  const day = i + 1
                  const lastItem = i == coinData.length - 1
                  const isToday = i === dayClaimed - 1

                  return (
                    <View
                      key={i}
                      sx={{
                        flexBasis: lastItem ? '46%' : '23%',
                        flexGrow: lastItem ? 2 : 1,
                        p: GAP_VALUE,
                      }}
                    >
                      {isToday && (
                        <Text
                          sx={{
                            fontSize: 12,
                            textAlign: 'center',
                            position: 'absolute',
                            top: -6,
                            left: 24,
                          }}
                        >
                          {t('filter.date.today')}
                        </Text>
                      )}
                      {lastItem ? (
                        <BigBox day={day} reward={e} active={i < dayClaimed} />
                      ) : (
                        <SmallBox
                          day={day}
                          reward={e}
                          active={i < dayClaimed}
                        />
                      )}
                    </View>
                  )
                })
              ) : (
                <ActivityIndicator color={'$primary.100'} />
              )}
            </Row>
          ) : null}
        </View>

        {children}
      </View>

      <View sx={{ width: '100%', bg: '#0007', py: '$2' }}>
        <MessageText>{t('rewards.checkInModal.resetIfFail')}</MessageText>
        <MessageText sx={{ textAlign: 'center' }}>{message}</MessageText>
      </View>

      <View sx={{ width: ['90%', '80%'], maxWidth: 500 }}>
        {enableCheckIn ? (
          <CheckInButton
            loading={false}
            disabled={!!data?.checked_in}
            onPress={() => handleGoToDeposit()}
          />
        ) : null}
      </View>
    </>
  )
}

const SmallBox = ({ day, reward, active }: BoxProps) => {
  const { t } = useLocalization()
  return (
    <BoxContainer
      sx={{ p: 10, justifyContent: 'space-evenly' }}
      active={active}
    >
      <CoinImage />
      <BoxTextGroup reward={reward} day={day} />
      {active && (
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/tick.png`}
          alt="coin"
          width={20}
          height={20}
          style={styles.tickPosition}
        />
      )}
    </BoxContainer>
  )
}

const BigBox = ({ day, reward, active }: BoxProps) => {
  const { t } = useLocalization()
  return (
    <BoxContainer
      sx={{ justifyContent: 'space-between', flex: 1 }}
      active={active}
    >
      <View sx={styles.boxLabel}>
        <Text sx={{ fontSize: 12, fontWeight: 'bold' }}>
          {t('rewards.checkInModal.surprise')}
        </Text>
      </View>
      <View sx={{ flexDirection: 'row' }}>
        <BoxTextGroup reward={reward} day={day} />
        <CoinImage sx={{ ml: 10 }} />
      </View>
      <View />
      {active && (
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/tick.png`}
          alt="coin"
          height={20}
          width={20}
          style={styles.tickPosition}
        />
      )}
    </BoxContainer>
  )
}

const BoxTextGroup = ({ reward, day }: BoxProps) => {
  const { t } = useLocalization()
  return (
    <View sx={{ alignItems: 'center' }}>
      <Text
        sx={{
          color: '$secondary.100',
          fontSize: 14,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        +{toThousandSeparator(reward)}
      </Text>
      <Text
        sx={{
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {t('rewards.checkInModal.day')} {day}
      </Text>
    </View>
  )
}

type CheckInButtonProps = {
  loading?: boolean
} & ComponentProps<typeof Pressable>

const CheckInButton = ({ loading, disabled, ...rest }: CheckInButtonProps) => {
  const { t } = useLocalization()
  return (
    <Pressable
      disabled={disabled || loading}
      sx={{
        backgroundColor: disabled ? '$disabled' : '$secondary.500',
        borderRadius: 40,
        p: 5,
        height: 40,
        justifyContent: 'center',
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={'$primary.300'} />
      ) : (
        <Text
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {disabled
            ? t('rewards.checkInModal.seeYouTmrBtn')
            : t('rewards.checkInModal.depositNow')}
        </Text>
      )}
    </Pressable>
  )
}

const BoxContainer = styled(View)(({ active }: { active?: boolean }) => ({
  alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: '$primary.500',
  borderRadius: 20,
  borderWidth: 3,
  borderColor: active ? '#EAB450' : '$primary.300',
}))

const CoinImage = styled(
  (props: Omit<ComponentProps<typeof SolitoImage>, 'alt' | 'src'>) => {
    const size = useResponsiveValue([30, 34])

    return (
      <SolitoImage
        alt="coin"
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`}
        width={size}
        height={size}
        {...props}
      />
    )
  }
)()

const CheckInText = styled(Text)({
  alignSelf: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: 24,
})

const MessageText = styled(Text)({
  textAlign: 'center',
  fontWeight: 'bold',
})

const styles = StyleSheet.create({
  boxLabel: {
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    p: 5,
  },
  boxBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: '#EAB450',
    borderRadius: 20,
  },
  tickPosition: {
    position: 'absolute',
    top: -7,
    right: -7,
  },
})

export default CheckInBox
