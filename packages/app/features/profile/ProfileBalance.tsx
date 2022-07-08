import { Gradient } from '@dripsy/gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { AnimateHeight } from 'app/transitions/animate-height'
import { styled, SxProp, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { useState } from 'react'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'

const ProfileBalance = () => {
  const { t } = useLocalization()
  const [isExtend, setIsExtend] = useState(false)

  const { data: playerBalance } = usePlayerBalanceQuery()
  const { main } = playerBalance?.data || {}
  const { balance = '0', reward = '0' } = main || {}
  const totalBalance = parseInt(balance) + parseInt(reward)
  const balanceValue = isNaN(totalBalance) ? 0 : totalBalance
  // WIP: Should not hard coded currency
  const formattedBalanceValue = toCurrency(balanceValue, Currency.VND, {
    symbol: false,
  })

  const handlePress = () => {
    setIsExtend(!isExtend)
  }

  return (
    <StyledGradient gradient="PaleBlue">
      <MotiPressable onPress={handlePress}>
        <View
          sx={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 75,
          }}
        >
          <BalanceItem
            title={t('common.balance')}
            value={formattedBalanceValue}
            size="large"
            _sx={{ justifyContent: 'center' }}
          />
          <MotifiedView
            animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
            transition={{
              type: 'timing',
              duration: 350,
            }}
            sx={{ position: 'absolute', right: 0 }}
          >
            <Icon name="chevdown" size={32} />
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
                    value={toCurrency(balance, Currency.VND, {
                      symbol: false,
                    })}
                    _sx={{
                      pr: '$5',
                    }}
                  />

                  <BalanceItem
                    title={t('common.reward')}
                    value={toCurrency(reward, Currency.VND, {
                      symbol: false,
                    })}
                    _sx={{
                      borderLeftWidth: 1,
                      pl: '$5',
                      borderLeftColor: '$lightNavyBlue',
                    }}
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
  size = 'small',
  _sx,
}: {
  title: string
  value: string
  size?: 'large' | 'small'
  _sx?: SxProp
}) => {
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
      <Icon name="lc" color={'#56f1ff'} sx={{ fontSize: [40, 50] }} />
      <View>
        <Text sx={{ fontSize: titleFontSize }}>{title}</Text>
        <Text
          sx={{
            fontSize: valueFontSize,
            fontWeight: 'bold',
            color: '$yellowLight',
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  )
}

const StyledGradient = styled(Gradient)(() => ({
  mt: '$5',
  mb: '$2',
  px: '$4',
  width: 400,
  alignSelf: 'center',
  maxWidth: '90%',
  borderWidth: 2,
  borderColor: '$lightNavyBlue',
  borderRadius: 18,
  position: 'relative',
}))

const MotifiedView = motify(View)()

export default ProfileBalance
