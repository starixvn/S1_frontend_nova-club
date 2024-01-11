import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency, toThousandSeparator } from 'app/utils'
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { useGetCoinQuery } from 'services/rewardApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import { Currency } from 'utils/constant'

interface HeaderButtonProps {
  icon?: string
  label: string
  value?: string
  isLoading: boolean
  onPress?: () => void
}

const HeaderButton = ({
  icon,
  label,
  value,
  isLoading,
  onPress,
}: HeaderButtonProps) => {
  return (
    <View sx={{}}>
      <Shadow
        stretch
        offset={[0, 1]}
        startColor={'rgba(255, 255, 255, 0.25)'}
        distance={1}
        style={{
          borderRadius: 15,
          marginBottom: 3,
        }}
      >
        <View
          sx={{
            px: '$2',
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 22,
            bg: '$primary.700',
            gap: '$1',
          }}
        >
          {icon ? (
            <Icon name={icon} size={14} color={'$secondary.100'} />
          ) : (
            <Pressable onPress={onPress} sx={{ ml: -8 }}>
              <SolitoImage
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/btn_rewards.png`}
                alt="icon"
                // fill
                width={50}
                height={20}
                // contentPosition={'left center'}
              />
            </Pressable>
          )}

          <View sx={{ marginLeft: 'auto' }}>
            {isLoading ? (
              <ActivityIndicator color={'$secondary.100'} />
            ) : (
              <Text
                numberOfLines={1}
                sx={{
                  flex: 1,
                  mt: FONT_TOP_OFFSET,
                  fontSize: [12, 14],
                  color: '$secondary.100',
                  minWidth: 40,
                  textAlign: 'right',
                }}
              >
                {value}
              </Text>
            )}
          </View>
        </View>
      </Shadow>
    </View>
  )
}

interface HeaderOverviewProps {
  // reward?: string
  // balance?: string
  // onBalancePress: () => void
  // onRewardPress: () => void
  // isLoading: boolean
}

const HeaderOverview = ({}: HeaderOverviewProps) => {
  const { push } = useRouter()
  const token = useAppSelector((s) => s.auth.info?.token)

  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery(undefined, { skip: !token })

  const {
    data: balance,
    isFetching: isCoinWalletLoading,
    refetch: coinRefetch,
  } = useGetCoinQuery()

  const width = useResponsiveValue([100, 120, 150])
  const coinRef = useRef()

  useEffect(() => {
    refetch
  }, [])

  const handleCoinPress = () => {
    push('/rewards/redeem/list')
  }

  const handleRefresh = () => {
    refetch()
    coinRefetch()
  }

  return (
    <View sx={{ py: 5, width }}>
      <Pressable onPress={handleRefresh}>
        <HeaderButton
          icon="wallet"
          label="Balance"
          value={toCurrency(playerBalance?.totalBalance ?? '-', Currency.VND, {
            symbol: false,
          })}
          isLoading={isMainWalletLoading}
        />

        <View
          ref={coinRef}
          onLayout={(event) => {
            console.log('onLayout', event.nativeEvent.layout)
          }}
        >
          <HeaderButton
            label="Reward"
            value={
              Number(balance) > 9999 ? '9,999+' : toThousandSeparator(balance)
            }
            isLoading={isCoinWalletLoading}
            onPress={handleCoinPress}
          />
        </View>
        {/* <View
          sx={{
            width: 100,
            height: 100,
            position: 'absolute',
            backgroundColor: 'gray',
            opacity: 1,
            zIndex: 11111,
          }}
        ></View> */}
      </Pressable>
    </View>
  )
}

export default HeaderOverview
