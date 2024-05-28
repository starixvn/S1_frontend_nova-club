import Icon from 'app/components/Icon'
import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'
import { Pressable, Text, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { startTransition, useState } from 'react'

const EURO_OPTIONS = [
  { label: 'Matches', value: LEAGUE_SECTION.EURO_MATCH },
  { label: 'Standings', value: LEAGUE_SECTION.EURO_STANDINGS },
  { label: 'Odds', value: LEAGUE_SECTION.EURO_ODDS },
]

const MatchSelectorEuro = ({ active, onPress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handlePress = (item) => {
    startTransition(() => setIsMenuOpen(false))
    onPress(item.value)
  }

  return (
    <>
      <Pressable
        sx={{ p: '$2', position: 'relative' }}
        onPress={() => onPress(LEAGUE_SECTION.EURO_MATCH)}
        onHoverIn={() => startTransition(() => setIsMenuOpen(true))}
      >
        <Icon
          name={'sport-euro-cup'}
          sx={{ fontSize: 26 }}
          color={active ? '$tertiary' : 'white'}
        />
      </Pressable>
      {isMenuOpen && (
        <>
          <Pressable
            sx={{
              position: 'absolute',
              width: 200,
              height: 180,
              top: -20,
              ml: -10,
            }}
            onHoverIn={() => startTransition(() => setIsMenuOpen(false))}
          />
          <View
            sx={{
              position: 'absolute',
              height: 40,
              width: 40,
            }}
          />
          <View
            sx={{
              position: 'absolute',
              top: 40,
              zIndex: 2,
            }}
          >
            <View
              sx={{
                ml: 15,
                width: 0,
                height: 0,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderBottomWidth: 10,
                borderColor: 'transparent',
                borderBottomColor: '$primary.200',
              }}
            />
            <Pressable
              sx={{
                bg: '$primary.200',
                p: '$2',
                pt: '$3',
                borderRadius: 12,
              }}
            >
              <View>
                {EURO_OPTIONS.map((item) => (
                  <MotiPressable
                    key={item.value}
                    animate={({ hovered, pressed }) => {
                      'worklet'

                      return {
                        opacity: hovered || pressed ? 0.5 : 1,
                      }
                    }}
                    onPress={() => handlePress(item)}
                  >
                    <Text sx={{ fontWeight: 'bold', mb: '$1' }}>
                      {item.label}
                    </Text>
                  </MotiPressable>
                ))}
              </View>
            </Pressable>
          </View>
        </>
      )}
    </>
  )
}

export default MatchSelectorEuro
