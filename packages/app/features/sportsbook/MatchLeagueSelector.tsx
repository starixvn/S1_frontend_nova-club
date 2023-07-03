import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { MatchLeagueTabIconMapping } from 'app/constants/recMatchMapping'
import { Pressable, Row, View, styled } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { memo, useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'

export default function MatchLeagueSelector({
  ids,
  onChange,
  value,
  gradient,
}) {
  const width = useWindowDimensions().width
  const maxWidth = Math.min(700, width * 0.8)

  console.log(ids)

  return (
    <DripsyGradient
      gradient={gradient}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {gradient && (
        <View
          sx={{
            bg: '$primary.50',
            height: 1,
            width: '100%',
          }}
        />
      )}
      <Row
        sx={{
          alignItems: 'center',
          width: '100%',
          maxWidth: maxWidth,
          gap: ['$1', '$2', '$3'],
          py: ['$1', '$2'],
        }}
      >
        {ids.map((id) => {
          return (
            <MatchLeagueSelectorTab
              key={id}
              id={id}
              active={value === id}
              onPress={onChange}
            />
          )
        })}
      </Row>
    </DripsyGradient>
  )
}

const MatchLeagueSelectorTab = memo(({ active, id, onPress, ...rest }) => {
  const iconRotate = useAnimationState({
    active: {
      rotateZ: [
        { value: '0rad', type: 'timing', duration: 1 },
        '0.3rad',
        '0rad',
      ],
      scale: [{ value: 1, type: 'timing', duration: 1 }, , 1.1, 1],
    },
    inactive: {
      scale: [1],
    },
  })

  const containerScale = useAnimationState({
    active: {
      scale: 1,
    },
    inactive: {
      scale: 0,
    },
  })

  useEffect(() => {
    iconRotate.transitionTo(active ? 'active' : 'inactive')
    containerScale.transitionTo(active ? 'active' : 'inactive')
  }, [active, containerScale, iconRotate])
  // console.log(MatchLeagueTabIconMapping[id])
  return (
    <Pressable
      sx={{
        p: '$2',
        position: 'relative',
        // height: 20,
        // width: 20,
      }}
      onPress={() => {
        console.log('onrepss', id)
        onPress && onPress(id)
      }}
      {...rest}
    >
      <MatchLeagueSelectorTabIndicator
        state={containerScale}
        transition={{ type: 'timing' }}
      />
      <IconContainer state={iconRotate} transition={{ type: 'timing' }}>
        <Icon
          name={MatchLeagueTabIconMapping[id]}
          sx={{ fontSize: [24, 30, 36] }}
          // state={iconColorFade}
          // animatedProps={color}
          color={active ? 'white' : '$tertiary'}
        />
      </IconContainer>
    </Pressable>
  )
})

MatchLeagueSelectorTab.displayName = 'MatchLeagueSelectorTab'

const MatchLeagueSelectorTabIndicator = styled(MotiView)({
  ...StyleSheet.absoluteFillObject,
  bg: '$primary.700',
  zIndex: -1,
  borderRadius: 15,
})

const IconContainer = styled(MotiView)({})
