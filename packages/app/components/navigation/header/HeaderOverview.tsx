import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import React, { useEffect } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { usePlayerBalanceQuery } from 'services/walletApi'

interface HeaderButtonProps {
  icon: string
  label: string
  value?: string
  isLoading: boolean
}

const HeaderButton = ({ icon, label, value, isLoading }: HeaderButtonProps) => {
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
          <Icon name={icon} size={14} color={'$secondary.100'} />

          {isLoading ? (
            <ActivityIndicator size={14} color={'$secondary.100'} />
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
  const token = useAppSelector((s) => s.auth.info?.token)
  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery(undefined, { skip: !token })

  const width = useResponsiveValue([100, 120, 150])

  useEffect(() => {
    refetch
  }, [])

  return (
    <Pressable
      onPress={refetch}
      sx={{
        py: 5,
        width,
      }}
    >
      <HeaderButton
        icon="wallet"
        label="Balance"
        value={toCurrency(playerBalance?.totalBalance ?? '-', Currency.VND, {
          symbol: false,
        })}
        isLoading={isMainWalletLoading}
      />

      <HeaderButton
        icon="gift"
        label="Reward"
        value={toCurrency(playerBalance?.totalReward ?? '-', Currency.VND, {
          symbol: false,
        })}
        isLoading={isMainWalletLoading}
      />
    </Pressable>
  )
}

export default HeaderOverview
