import Icon from 'app/components/Icon'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { ActivityIndicator, Text, View, styled, useDripsyTheme } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti/build'
import { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import { Currency } from 'utils/constant'

interface HiddenItemProps {
  color: string
  iconName: string
  value: number
  currency?: Currency
  label: string
  isLoading: boolean
}

interface ProfileSummaryTextProps {
  px?: number
  fontSize?: number
  color?: string
}

interface ProfileBalanceSummaryProps {
  reward: number
  cash: number
  isLoading: boolean
  currency: Currency
}

const ProfileBalanceSummary = ({
  reward,
  cash,
  isLoading,
  currency,
}: ProfileBalanceSummaryProps) => {
  const { theme } = useDripsyTheme()
  const desktop = useIsDesktop()
  const [isExtend, setIsExtend] = useState(desktop)
  const { t } = useLocalization()
  const { width } = useWindowDimensions()
  const summaryContainerWidth = Math.min(
    450,
    desktop ? width * 0.3 : width * 0.85
  )

  const handlePress = () => {
    setIsExtend(!isExtend)
  }
  return (
    <ProfileBalanceSummaryContainer
      width={summaryContainerWidth}
      desktop={desktop}
    >
      <BalanceSection>
        <BalanceItem>
          <Icon
            name={'wallet'}
            size={26}
            color={theme.colors.$secondary[100]}
            sx={{ px: 5 }}
          />
          <ProfileSummaryText px={8} fontSize={14}>
            {t('common.balance')}
          </ProfileSummaryText>
        </BalanceItem>
        <BalanceItem>
          {isLoading ? (
            <ActivityIndicator color={'$secondary.100'} />
          ) : (
            <ProfileSummaryText px={5} color={theme.colors.$secondary[100]}>
              {toCurrency(reward + cash, currency, {
                symbol: false,
                hideTruncatedThousand: false,
              })}
            </ProfileSummaryText>
          )}
          {!desktop && (
            <MotiView
              from={{ transform: [{ rotate: '0deg' }] }}
              animate={{
                transform: [{ rotate: isExtend ? '-180deg' : '0deg' }],
              }}
              transition={{ type: 'timing' }}
            >
              <TouchableOpacity onPress={handlePress}>
                <Icon name={'down'} color={'white'} sx={{ p: 10 }} size={16} />
              </TouchableOpacity>
            </MotiView>
          )}
        </BalanceItem>
      </BalanceSection>
      <AnimatePresence>
        {isExtend && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              height: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing' }}
          >
            <HiddenItem
              color={theme.colors.$secondary[100]}
              iconName="cash"
              label={t('common.cash')}
              value={cash}
              isLoading={isLoading}
              currency={currency}
            />
            <View sx={{ backgroundColor: '$primary.100', width: 1 }} />
            <HiddenItem
              color={theme.colors.$secondary[100]}
              iconName="vui-coin"
              label={t('rewards.coin')}
              isLoading={isLoading}
              value={reward}
              currency={currency}
            />
          </MotiView>
        )}
      </AnimatePresence>
    </ProfileBalanceSummaryContainer>
  )
}

const HiddenItem = ({
  color,
  iconName,
  value,
  label,
  currency,
  isLoading,
}: HiddenItemProps) => {
  return (
    <HiddenItemContainer>
      <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconName === 'vui-coin' ? (
          <SolitoImage
            src={require('app/assets/images/rewards/coin.png')}
            width={22}
            height={22}
            // fill
            contentFit="contain"
            alt=""
          />
        ) : (
          <Icon name={iconName} color={color} sx={{ px: 5 }} size={18} />
        )}
        <ProfileSummaryText fontSize={12} px={10}>
          {label}
        </ProfileSummaryText>
      </View>
      <View
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ProfileSummaryText fontSize={20}>
            {currency
              ? toCurrency(value, currency, {
                  symbol: false,
                  hideTruncatedThousand: false,
                })
              : value}
          </ProfileSummaryText>
        )}
      </View>
    </HiddenItemContainer>
  )
}

const ProfileBalanceSummaryContainer = styled(View)(
  ({ width, desktop }: { width: number; desktop: boolean }) => ({
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: '$primary.100',
    borderWidth: 1,
    my: 20,
    bg: desktop ? '$primary.500' : 'transparent',
    width,
  })
)

const BalanceSection = styled(View)({
  flexDirection: 'row',
  px: 15,
  py: 10,
  justifyContent: 'space-between',
})

const BalanceItem = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const HiddenItemContainer = styled(View)({
  px: 15,
  py: 10,
  width: '50%',
  flexDirection: 'column',
  borderTopColor: '$primary.100',
  borderTopWidth: 1,
})

const ProfileSummaryText = styled(Text)(
  ({ color = 'white', fontSize = 16, px = 0 }: ProfileSummaryTextProps) => ({
    fontSize,
    px,
    color,
    fontWeight: '500',
    textTransform: 'uppercase',
  })
)

export default ProfileBalanceSummary
