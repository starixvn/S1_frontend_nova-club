import { Gradient } from '@dripsy/gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import { usePlayerBalanceQuery } from 'app/services/wallet'
import { PlayerBalanceResult } from 'app/services/wallet.type'
import { AnimateHeight } from 'app/transitions/animate-height'
import { styled, SxProp, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { useState } from 'react'

const ProfileBalance = () => {
  const [isExtend, setIsExtend] = useState(false)

  const { data } = usePlayerBalanceQuery()

  const handlePress = () => {
    setIsExtend(!isExtend)
  }
  console.log('data', data)
  const { t } = useLocalization()

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
            value={
              isNaN(
                parseInt(data?.data?.main?.balance) +
                  parseInt(data?.data?.main?.reward)
              )
                ? 0
                : parseInt(data?.data?.main?.balance) +
                  parseInt(data?.data?.main?.reward)
            }
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
                    title="Cash"
                    value={data?.data?.main?.balance ?? 0}
                    _sx={{
                      pr: '$7',
                    }}
                  />
                  <BalanceItem
                    title="Reward"
                    value={data?.data?.main?.reward ?? 0}
                    _sx={{
                      borderLeftWidth: 1,
                      pl: '$7',
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
      <Icon name="lc" size={50} color={'#56f1ff'} />
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
  mx: '$3',
  mt: '$5',
  mb: '$2',
  px: '$8',
  borderWidth: 2,
  borderColor: '$lightNavyBlue',
  borderRadius: 18,
  position: 'relative',
}))

const MotifiedView = motify(View)()

export default ProfileBalance
