import { EntityId } from '@reduxjs/toolkit'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import {
  LEAGUE_SECTION,
  MatchLeagueId,
  MatchLeagueTabIconMapping,
} from 'app/constants/recMatchMapping'
import { Pressable, Row, View, styled } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { Dispatch, SetStateAction, memo, useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import MatchSelectorEuro from './MatchSelectorEuro'
import usePathname from 'app/hooks/usePathname'

interface MatchLeagueSelectorProps {
  ids: EntityId[]
  onChange: (args1: EntityId, args2: LEAGUE_SECTION) => void
  value: EntityId
  gradient?: string
}

interface MatchLeagueSelectorTabProps {
  id: EntityId
  onPress: Dispatch<SetStateAction<EntityId | undefined>>
  active: boolean
}

export default function MatchLeagueSelector({
  ids,
  onChange,
  value,
  gradient,
}: MatchLeagueSelectorProps) {
  const pathname = usePathname()
  const width = useWindowDimensions().width
  const maxWidth = Math.min(700, width * 0.8)

  const handleEuroPress = (leagueSection) => {
    onChange(MatchLeagueId.EURO_CUP.toString(), leagueSection)
  }

  return (
    <DripsyGradient gradient={gradient} sx={{ my: '$1', zIndex: 2 }}>
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
          py: '$1',
          px: '$4',
          my: '$1',
        }}
      >
        {/* {pathname.includes('/sportsbook') && (
          <MatchSelectorEuro
            active={value === MatchLeagueId.EURO_CUP.toString()}
            onPress={handleEuroPress}
          />
        )} */}
        {ids.map((id) => {
          return (
            <MatchLeagueSelectorTab
              key={id}
              id={id}
              active={value === id}
              onPress={() => onChange(id, LEAGUE_SECTION.LEAGUE_ODDS)}
            />
          )
        })}
      </Row>
    </DripsyGradient>
  )
}

const MatchLeagueSelectorTab = memo(
  ({ active, id, onPress, ...rest }: MatchLeagueSelectorTabProps) => {
    const iconRotate = useAnimationState({
      active: {
        rotateZ: [
          { value: '0rad', type: 'timing', duration: 250 },
          '0.3rad',
          '0rad',
        ],
        scale: [{ value: 1, type: 'timing', duration: 250 }, 1.1, 1],
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
    }, [active, containerScale, iconRotate, onPress])
    // console.log(MatchLeagueTabIconMapping[id])
    return (
      <Pressable
        sx={{
          p: '$2',
          position: 'relative',
        }}
        onPress={() => {
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
            sx={{ fontSize: 26 }}
            // state={iconColorFade}
            // animatedProps={color}
            color={active ? '$tertiary' : 'white'}
          />
        </IconContainer>
      </Pressable>
    )
  }
)

MatchLeagueSelectorTab.displayName = 'MatchLeagueSelectorTab'

const MatchLeagueSelectorTabIndicator = styled(MotiView)({
  ...StyleSheet.absoluteFillObject,
  bg: '$primary.700',
  zIndex: -1,
  borderRadius: 15,
})

const IconContainer = styled(MotiView)({})
