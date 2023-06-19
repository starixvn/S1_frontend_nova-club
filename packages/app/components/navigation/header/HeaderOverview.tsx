import React from 'react'
import {
  Pressable,
  View,
  Text,
  useDripsyTheme,
  ActivityIndicator,
} from 'dripsy'
import { Shadow } from 'react-native-shadow-2'
import Icon from 'app/components/Icon'

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
  const { theme } = useDripsyTheme()
  return (
    <Pressable onPress={onPress}>
      <Shadow
        offset={[0, 1]}
        startColor={'rgba(255, 255, 255, 0.25)'}
        distance={1}
        style={{
          borderRadius: 15,
          minWidth: 135,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingVertical: 4,
          marginBottom: 3,
          backgroundColor: theme.colors.$primary[700],
        }}
      >
        <Icon name={icon} size={16} color={'$secondary.100'} />

        {isLoading ? (
          <ActivityIndicator
            sx={{
              minWidth: 40,
              textAlign: 'right',
            }}
          />
        ) : (
          <Text
            sx={{
              fontSize: 14,
              color: '$secondary.100',
              minWidth: 40,
              textAlign: 'right',
            }}
          >
            {value}
          </Text>
        )}
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
