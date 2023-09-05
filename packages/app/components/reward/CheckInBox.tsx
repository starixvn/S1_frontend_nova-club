import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { getErrorMessage } from 'app/utils/validation'
import {
  ActivityIndicator,
  Image,
  Pressable,
  Row,
  Text,
  View,
  styled,
  useResponsiveValue,
} from 'dripsy'
import React, { ComponentProps, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useModal } from 'react-native-modalfy'
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
  const { data } = useGetDailyCoinQuery()
  const [CheckIn] = useCheckInDailyCoinMutation()
  const [isCheckingIn, setCheckingIn] = useState(false)
  const { push } = useRouter()
  const { openModal, closeModal, closeAllModals } = useModal()
  const { t } = useLocalization()
  const GAP_VALUE = useResponsiveValue([6, 10])

  const coinData = data ? data.daily_setting.map((e) => e.coin) : []
  const dayClaimed = data?.checked_in ? data.day : (data?.day ?? 0) - 1
  // const PT1 = coinData.slice(0, 4)
  // const PT2 = coinData.slice(5)

  async function handleCheckIn() {
    try {
      setCheckingIn(true)
      await CheckIn().unwrap()
    } catch (e) {
      const error = getErrorMessage(e)

      openModal('ActionableModal', {
        actions: [
          {
            disableAutoClose: true,
            label: t('rewards.checkInModal.depositNow'),
            onPress: () => {
              if (Platform.OS !== 'web') push('/deposit')
              closeAllModals(() => {
                push('/deposit')
              })
            },
          },
        ],
        message: error,
        isShowHeader: false,
      })
      // showAlert(error)
    } finally {
      setCheckingIn(false)
    }
  }

  return (
    <View sx={{ width: ['90%', '80%'], maxWidth: 500 }}>
      <View
        sx={{
          backgroundColor: '$primary.300',
          p: 20,
          borderRadius: 15,
        }}
      >
        <CheckInText
          sx={{
            mb: 20,
          }}
        >
          {t('rewards.checkInModal.topDesc')}
        </CheckInText>
        <Row sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {coinData.length > 0 ? (
            coinData.map((e, i) => {
              const day = i + 1
              const lastItem = i == coinData.length - 1
              return (
                <View
                  key={i}
                  sx={{
                    flexBasis: lastItem ? '46%' : '23%',
                    flexGrow: lastItem ? 2 : 1,
                    p: GAP_VALUE,
                  }}
                >
                  {lastItem ? (
                    <BigBox day={day} reward={e} active={i < dayClaimed} />
                  ) : (
                    <SmallBox day={day} reward={e} active={i < dayClaimed} />
                  )}
                </View>
              )
            })
          ) : (
            <ActivityIndicator color={'$primary.100'} />
          )}
        </Row>
      </View>
      <Text
        sx={{
          my: GAP_VALUE,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 18,
          lineHeight: 22,
          fontWeight: 'bold',
          width: '80%',
        }}
      >
        {t('rewards.checkInModal.resetIfFail')}
      </Text>

      <CheckInButton
        loading={isCheckingIn}
        disabled={!!data?.checked_in}
        onPress={() => handleCheckIn()}
      />

      {children}
    </View>
  )
}

const SmallBox = ({ day, reward, active }: BoxProps) => {
  return (
    <BoxContainer
      sx={{
        // flex: 0.25,
        p: 10,
        justifyContent: 'space-evenly',
      }}
      active={active}
    >
      <CoinImage />
      <BoxTextGroup reward={reward} day={day} />
      {active && (
        <Image
          source={require('app/assets/images/rewards/tick.png')}
          alt="coin"
          sx={styles.tickPosition}
        />
      )}
    </BoxContainer>
  )
}

const BigBox = ({ day, reward, active }: BoxProps) => {
  const { t } = useLocalization()
  return (
    <BoxContainer
      sx={{
        justifyContent: 'space-between',
        flex: 1,
        // height: '100%',
      }}
      active={active}
    >
      <View sx={styles.boxLabel}>
        <Text
          sx={{
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          {t('rewards.checkInModal.surprise')}
        </Text>
      </View>
      <View sx={{ flexDirection: 'row' }}>
        <BoxTextGroup reward={reward} day={day} />
        <CoinImage sx={{ ml: 10 }} />
      </View>
      <View />
      {active && (
        <Image
          source={require('app/assets/images/rewards/tick.png')}
          alt="coin"
          sx={styles.tickPosition}
        />
      )}
    </BoxContainer>
  )
}

const BoxTextGroup = ({ reward, day }: BoxProps) => {
  const { t } = useLocalization()
  return (
    <View
      sx={{
        alignItems: 'center',
      }}
    >
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
            : t('rewards.checkInModal.checkinBtn')}
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
        src={require('app/assets/images/rewards/coin.png')}
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
    height: 20,
    width: 20,
  },
})

export default CheckInBox
