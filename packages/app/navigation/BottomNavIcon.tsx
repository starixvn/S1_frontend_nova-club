import AnimateCrossFadeIn from 'app/components/AnimateCrossFadeIn'
import TextInput from 'app/components/form/TextInput'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { Flex, Image, Pressable, Text, View } from 'dripsy'
import {
  AnimatePresence,
  motify,
  MotiImage,
  MotiText,
  MotiView,
  useAnimationState,
} from 'moti'
import React, { FC, useEffect } from 'react'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
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
  const borderColor = active ? '#33A0D0' : '#133351'
  const colorGradient = active ? ['#24C0E3', '#3799CC'] : ['#0D2035', '#0B76A5']
  const fontColor = active ? '#26BCE0' : '#0B76A5'

  // const MotiIcon = motify(<TextInput style={{backgroundColor: 'red', height:100, width: 100}} />)()
  // const MotiIcon = motify(<TabIcon active={active} iconName={iconName} />)()

  const outerAnimationState = useAnimationState({
    from: {
      scale: 0.8,
    },
    to: {
      scale: 0.8,
    },
    active: {
      scale: 1,
    },
  })

  const innerAnimationState = useAnimationState({
    from: {
      opacity: 0.8,
      background: '#0B76A5',
    },
    to: {
      opacity: 0.8,
      background: '#0B76A5',
    },
    active: {
      opacity: 1,
      background: '#24C0E3',
    },
  })

  const textState = useAnimationState({
    from: {
      fontSize: 12,
    },
    to: {
      fontSize: 12,
    },
    active: {
      fontSize: 14,
    },
  })

  useEffect(() => {
    if (active) {
      outerAnimationState.transitionTo('active')
      innerAnimationState.transitionTo('active')
      textState.transitionTo('active')
    } else {
      outerAnimationState.transitionTo('to')
      innerAnimationState.transitionTo('to')
      textState.transitionTo('to')
    }
  }, [active])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'visible',
        }}
      >
        <MotiView
          state={outerAnimationState}
          transition={{ type: 'spring' }}
          style={{
            height: size,
            width: size,
            borderRadius: size * 0.5,
            borderWidth: 2,
            borderColor: borderColor,
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
          >
            <DripsyGradient
              colors={colorGradient}
              sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimateCrossFadeIn active={active}>
                <TabIcon active={active} iconName={iconName} />
              </AnimateCrossFadeIn>
            </DripsyGradient>
          </MotiView>
        </MotiView>

        <MotiText
          state={textState}
          style={{
            marginTop: 1,
            textTransform: 'capitalize',
            fontWeight: active ? 'bold' : 'normal',
            color: fontColor,
          }}
          numberOfLines={1}
        >
          {name}
        </MotiText>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

type TabIconProps = {
  iconName: string
  active?: boolean
}

const TabIcon: FC<TabIconProps> = ({ iconName, active }) => {
  return (
    <Icon
      name={iconName}
      size={28}
      sx={(theme) => ({
        color: active ? 'white' : theme.colors['$secondary'],
      })}
    />
  )
}
export default BottomNavIcon
