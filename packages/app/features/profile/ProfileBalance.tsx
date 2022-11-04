import { Gradient } from '@dripsy/gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { AnimateHeight } from 'app/transitions/animate-height'
import { ActivityIndicator, styled, SxProp, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { useMemo, useState } from 'react'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { usePlayerProfileQuery } from 'services/playerApi'

type BalanceItemProps = {
  title: string
  value: number
  currency: Currency
  loading?: boolean
  size?: 'large' | 'small'
  _sx?: SxProp
  icon: string
  _iconStyle: SxProp
}

const ProfileBalance = () => {
  const { t } = useLocalization()
  const [isExtend, setIsExtend] = useState(false)

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const { isFetching, wallets } = usePlayerBalanceQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      wallets: s.data?.data,
    }),
  })

  const walletInfo = useMemo(() => {
    const sum = {
      cash: 0,
      reward: 0,
    }

    if (wallets)
      Object.values(wallets).forEach((v) => {
        sum.cash += v.balance ? Number(v.balance) : 0
        sum.reward += v.reward ? Number(v.reward) : 0
      })

    return sum
  }, [wallets])

  const balance = walletInfo.cash + walletInfo.reward

  const handlePress = () => {
    setIsExtend(!isExtend)
  }

  return (
    <StyledGradient gradient="PaleBlue">
      <MotiPressable onPress={handlePress}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 75,
          }}
        >
          <BalanceItem
            title={t('common.balance')}
            value={balance ?? 0}
            currency={currency}
            size="large"
            isLoading={isFetching}
            _sx={{ justifyContent: 'center' }}
            icon="bw"
            _iconStyle={{ fontSize: 35 }}
          />
          <MotifiedView
            animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
            transition={{
              type: 'timing',
              duration: 350,
            }}
            sx={{ position: 'absolute', right: 0 }}
          >
            <Icon name="chevdown" size={20} color={'$lightCyan'} />
          </MotifiedView>
        </View>

        <AnimateHeight enterFrom="bottom" hide={!isExtend}>
          <AnimatePresence>
            {isExtend && (
              <MotifiedView
                from={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                sx={{
                  flex: 1,
                  borderTopWidth: 1,
                  borderTopColor: '$lightNavyBlue',
                  justifyContent: 'center',
                  minHeight: 75,
                }}
              >
                <View
                  sx={{
                    flexDirection: 'row',
                    height: '80%',
                  }}
                >
                  <BalanceItem
                    title={t('common.cash')}
                    value={walletInfo.cash}
                    currency={currency}
                    isLoading={isFetching}
                    _sx={{
                      pr: '$5',
                    }}
                    icon="ac"
                    _iconStyle={{ color: '$border', fontSize: 30 }}
                  />

                  <BalanceItem
                    title={t('common.reward')}
                    value={walletInfo.reward}
                    currency={currency}
                    isLoading={isFetching}
                    _sx={{
                      borderLeftWidth: 1,
                      pl: '$5',
                      borderLeftColor: '$lightNavyBlue',
                    }}
                    icon="gift"
                    _iconStyle={{ color: '$border', fontSize: 35 }}
                  />
                </View>
              </MotifiedView>
            )}
          </AnimatePresence>
        </AnimateHeight>
      </MotiPressable>
    </StyledGradient>
  )
}

const BalanceItem = ({
  title,
  value,
  currency,
  isLoading = false,
  size = 'small',
  _sx,
  icon,
  _iconStyle,
}: BalanceItemProps) => {
  const titleFontSize = size === 'large' ? 14 : 12
  const valueFontSize = size === 'large' ? 24 : 20

  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        ..._sx,
      }}
    >
      <Icon name={icon} color={'#56f1ff'} sx={{ mr: '$2', ..._iconStyle }} />
      <View sx={{ ml: '$1' }}>
        <Text sx={{ fontSize: titleFontSize }}>{title}</Text>
        {isLoading ? (
          <ActivityIndicator color={'$lightCyan'} sx={{ py: '$1' }} />
        ) : (
          <Text
            sx={{
              fontSize: valueFontSize,
              fontWeight: 'bold',
              color: '$yellowLight',
            }}
          >
            {toCurrency(value, currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
        )}
      </View>
    </View>
  )
}

const StyledGradient = styled(Gradient)(() => ({
  mt: '$2',
  mb: '$2',
  px: '$4',
  alignSelf: 'center',
  borderWidth: 2,
  borderColor: '$lightNavyBlue',
  borderRadius: 18,
  width: '100%',
  position: 'relative',
}))

const MotifiedView = motify(View)()

export default ProfileBalance
