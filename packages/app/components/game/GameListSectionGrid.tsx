import { useAppSelector } from 'app/provider/redux/store'
import { GameToLaunchPayload } from 'app/utils/game'
import { Pressable, Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Game } from 'services/gameApi.type'
import { DripsyGradient } from '../Gradient'
import GameCard from './GameCard'

import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Shadow } from 'react-native-shadow-2'
type Props = {}

export default function GameListSectionGrid({ children }: Props) {
  return <View>{children}</View>
}

const GameListSectionGridHeader = styled(View)({
  bg: '$primary.100',
  borderTopRightRadius: [15, 20],
  // width: [120, 130],
  pr: '2%',
  pl: '$3',
  py: '$2',
  alignItems: 'flex-end',
  justifyContent: 'center',
  marginRight: 'auto',
})

const GameListSectionGridFilter = ({ children }) => {
  return (
    <View sx={{ borderTopWidth: 1, borderColor: '$primary.100' }}>
      <DripsyGradient
        gradient="surface"
        sx={{
          px: '$3',
          py: '$2',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '$3',
        }}
      >
        {children}
      </DripsyGradient>
    </View>
  )
}

const width = ['22%', '18%', '15%', '15%', '12%']
const spaces = ['1.5%', '1%', '0.83%', '0.83%', '1.14%']

const GameListSectionGridList = ({
  data,
  bordered = false,
}: {
  data: Game[]
  bordered?: boolean
}) => {
  const locale = useAppSelector((s) => s.setting.locale)
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        px: ['$3'],
        pt: ['$2'],
        pb: '$sectionBottomSpace',
        borderWidth: bordered ? 2 : 0,
        borderColor: '$primary.300',
      }}
    >
      {data.map((g, i) => {
        const launchPayload = GameToLaunchPayload(g, locale)
        return (
          <GameCard
            key={i}
            width={width}
            sx={{
              m: spaces,
            }}
            {...launchPayload}
          />
        )
      })}
    </Row>
  )
}

const TagButton = ({ isActive, children = '', ...rest }) => {
  const { theme } = useDripsyTheme()
  return (
    <Pressable sx={{ maxWidth: 100, marginBottom: 2 }} {...rest}>
      <Shadow
        safeRender
        style={{ flex: 1, borderRadius: 30, overflow: 'hidden' }}
        offset={[0, 1]}
        distance={1}
        startColor={theme.colors.$primary[100]}
        stretch
      >
        <View
          sx={{
            px: ['$2', '$3'],
            py: ['$1', 6],
            bg: '$primary.700',
          }}
        >
          <Text
            numberOfLines={1}
            sx={{
              mt: FONT_TOP_OFFSET,
              fontSize: 11,
              fontWeight: '900',
              color: isActive ? 'white' : '$tertiary',
              textAlign: 'center',
            }}
          >
            {children.toUpperCase()}
          </Text>
        </View>
      </Shadow>
    </Pressable>
  )
}

GameListSectionGrid.Header = GameListSectionGridHeader
GameListSectionGrid.Filter = GameListSectionGridFilter
GameListSectionGrid.GameList = GameListSectionGridList
GameListSectionGrid.TagButton = TagButton
