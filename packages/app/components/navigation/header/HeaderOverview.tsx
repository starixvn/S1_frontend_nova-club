import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import isDesktop from 'app/utils/isDesktop'
import { ActivityIndicator, Pressable, Text, View } from 'dripsy'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

interface HeaderButtonProps {
  icon: string
  label: string
  value?: string
  isLoading: boolean
  onPress: () => void
}

const HeaderButton = ({
  icon,
  label,
  value,
  onPress,
  isLoading,
}: HeaderButtonProps) => {
  const desktop = isDesktop()
  return (
    <Pressable onPress={onPress}>
      <Shadow
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
            minWidth: desktop ? 125 : 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 22,
            bg: '$primary.700',
          }}
        >
          <Icon name={icon} size={14} color={'$secondary.100'} />

          {isLoading ? (
            <ActivityIndicator size={14} color={'$secondary.100'} />
          ) : (
            <Text
              sx={{
                mt: FONT_TOP_OFFSET,
                fontSize: 14,
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
    </Pressable>
  )
}

interface HeaderOverviewProps {
  reward?: string
  balance?: string
  onBalancePress: () => void
  onRewardPress: () => void
  isLoading: boolean
}

const HeaderOverview = ({
  reward,
  balance,
  onBalancePress,
  onRewardPress,
  isLoading,
}: HeaderOverviewProps) => {
  return (
    <View
      sx={{
        alignItems: 'center',
        mx: 5,
        py: 5,
      }}
    >
      <HeaderButton
        icon="wallet"
        label="Balance"
        value={balance}
        onPress={onBalancePress}
        isLoading={isLoading}
      />

      <HeaderButton
        icon="gift"
        label="Reward"
        value={reward}
        onPress={onRewardPress}
        isLoading={isLoading}
      />
    </View>
  )
}

export default HeaderOverview
