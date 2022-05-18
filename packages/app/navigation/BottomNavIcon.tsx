import { DripsyGradient } from 'app/components/Gradient';
import Icon from 'app/components/Icon';
import { Flex, Image, Pressable, Text, View } from 'dripsy'
import { MotiImage, MotiText, MotiView, useAnimationState } from 'moti'
import React, { FC, useEffect } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
interface BottomNavTabProps {
  active?: boolean
  name: string
  iconName: string
  size: number
  onPress: () => void
}

const BottomNavIcon: FC<BottomNavTabProps> = ({
  active = false,
  name,
  iconName,
  size,
  onPress,
}) => {
  const color = active ? '#29badf' : '#0D2035'
  const borderColor = active ? '#33A0D0' : '#133351';
  const colorGradient = active ? ['#24C0E3', '#3799CC'] : ['#0D2035', '#0B76A5']

  const outerAnimationState = useAnimationState({
    from: {
      scale: 1,
      borderColor: '#133351',
    },
    to: {
      scale: 1,
      borderColor: '#133351',
    },
    active: {
      scale: 1.2,
      borderColor: '#33A0D0',
    },
  })

  const innerAnimationState = useAnimationState({
    from: {
      opacity: 0.8,
      background: '#0B76A5',
      boxShadow: 'inset 0px 5px 12px #0D2035',
      shadowColor: '#0D2035',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 9,
    },
    to: {
      opacity: 0.8,
      background: '#0B76A5',
      boxShadow: 'inset 0px 5px 12px #0D2035',
      shadowColor: '#0D2035',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 5.5,
      elevation: 9,
    },
    active: {
      opacity: 1,
      background: '#24C0E3',
      boxShadow: `inset 0px 3px 6px #0B76A5, 0px 0px 16px #33A0D0`,
      shadowColor: '#33A0D0',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 7.5,
      elevation: 12,
    },
  })

  const iconState = useAnimationState({
    from: {
      scale: 1,
      fontSize: 24,
      color: '#0D2035'
    },
    to: {
      scale: 1,
      fontSize: 24,
      color: '#0D2035'
    },
    active: {
      scale: 1.25,
      fontSize: 36,
      color: '#FFFFFF'
    },
  })

  const textState = useAnimationState({
    from: {
      fontSize: 12,
      color: '#0B76A5'
    },
    to: {
      fontSize: 12,
      color: '#0B76A5'
    },
    active: {
      fontSize: 16,
      color: '#26BCE0'
    },
  })

  useEffect(() => {
    if (active) {
      outerAnimationState.transitionTo('active')
      innerAnimationState.transitionTo('active')
      iconState.transitionTo('active')
      textState.transitionTo('active')
    } else {
      outerAnimationState.transitionTo('to')
      innerAnimationState.transitionTo('to')
      iconState.transitionTo('to')
      textState.transitionTo('to')
    }
  }, [active])

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'visible',
        }}
      >
        {/* <MotiView
          state={outerAnimationState}
          transition={{ type: 'spring' }}
          style={{
            height: size,
            width: size,
            borderRadius: size * 0.5,
            borderWidth: 2,
            backgroundColor: '#0D2035',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <MotiView
          state={innerAnimationState}
          transition={{ type: 'spring' }}
          style={{
            height: size * 0.8,
            width: size * 0.8,
            borderRadius: size * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        > */}
            <DripsyGradient
              colors={colorGradient}
              sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                // shadowColor: '#33A0D0',
                // shadowOffset: { width: 0, height: 0 },
                // shadowOpacity: 1,
                // shadowRadius: 7.5,
                // elevation: 12,
              }}>
              <MotiView state={iconState} >
                <Icon
                  name={iconName}
                  size={28}
                  sx={(theme) => ({
                    color: active ? 'white' : theme.colors['#0D2035'],
                  })}
                />
              </MotiView>
            </DripsyGradient>
          {/* </MotiView>
        </MotiView> */}

        <MotiText
        state={textState}
          style={{
            marginTop: 1,
            textTransform: 'capitalize',
            // fontSize: active ? 16 : 12,
            fontWeight: active ? 'bold' : 'normal'
          }}
          numberOfLines={1}
        >
          {name}
        </MotiText>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

export default BottomNavIcon
