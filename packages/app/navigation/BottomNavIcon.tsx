import Icon from 'app/components/Icon'
import { Flex, Text, View } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { FC, useEffect } from 'react'
import { Pressable } from 'react-native'

interface BottomNavTabProps {
  active?: boolean
  name: string,
  iconName: string,
  onPress: () => void
}

const BottomNavIcon: FC<BottomNavTabProps> = ({
  active = false,
  name,
  iconName,
  onPress,
}) => {
  const color = active ? '#29badf' : '#0D2035'

  const animationState = useAnimationState({
    from: {
      opacity: 0.9,
      scale: 1,
    },
    to: {
      opacity: 0.9,
      scale: 1,
    },
    active: {
      opacity: 1,
      scale: 1.2,
    },
  })

  useEffect(() => {
    if (active) {
      animationState.transitionTo('active')
    } else {
      animationState.transitionTo('to')
    }
  }, [active])

  return (
    <Pressable onPress={onPress}>
      <MotiView state={animationState} transition={{ type: 'spring' }}>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            sx={{
              height: 50,
              width: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: active
                ? 'rgba(255,255,255,1)'
                : 'rgba(255,255,255,.5)',
              marginTop: -25,
              backgroundColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name={iconName}
              size={30}
              sx={(theme) => ({
                color: active ? theme.colors['0D2035'] : theme.colors['fffff'],
              })}
            />
          </View>
          <Text
            sx={{
              marginTop: 'auto',
              textTransform: 'capitalize',
              color: '#29badf',
              fontSize: 11,
              fontWeight: active ? 'bold' : 'normal'
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
        </Flex>
      </MotiView>
    </Pressable>
  )
}

export default BottomNavIcon
