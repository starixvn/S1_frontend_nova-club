import { Gradient } from '@dripsy/gradient'
import Divider from 'app/components/Divider'
import IconButton from 'app/components/form/IconButton'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { AnimateHeight } from 'app/transitions/animate-height'
import { styled, StyledProps, SxProp, Text, View } from 'dripsy'
import { AnimatePresence, motify, MotiView, useDynamicAnimation } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { useAnimatedGestureHandler } from 'react-native-reanimated'

const ProfileBalance = () => {
  const [isExtend, setIsExtend] = useState(false)
  // const animation = useDynamicAnimation(() => {
  //   // optional function that returns your initial style
  //   return {
  //     height: 100,
  //   }
  // })

  const handlePress = () => {
    setIsExtend(!isExtend)
    // animation.animateTo({ height: 200 })
  }

  return (
    <StyledGradient gradient="PaleBlue">
      <MotiPressable onPress={handlePress}>
        <View
          sx={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 100,
          }}
        >
          <BalanceItem
            title="Balance"
            value="88K"
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
                  minHeight: 100,
                }}
              >
                <View
                  sx={{
                    flexDirection: 'row',
                    height: '80%',
                  }}
                >
                  <BalanceItem title="Cash" value="86K" />
                  <BalanceItem
                    title="Reward"
                    value="2K"
                    _sx={{
                      borderLeftWidth: 1,
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
  const titleFontSize = size === 'large' ? 18 : 16
  const valueFontSize = size === 'large' ? 28 : 24

  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        ..._sx,
      }}
    >
      <Icon name="lc" size={50} />
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
  m: '$4',
  px: '$4',
  borderWidth: 2,
  borderColor: '$lightNavyBlue',
  borderRadius: 18,
  position: 'relative',
}))

const MotifiedView = motify(View)()

export default ProfileBalance
