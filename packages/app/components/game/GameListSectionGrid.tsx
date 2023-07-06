import { useAppSelector } from 'app/provider/redux/store'
import { GameToLaunchPayload } from 'app/utils/game'
import {
  Pressable,
  Row,
  Text,
  TextInput,
  View,
  styled,
  useDripsyTheme,
} from 'dripsy'
import React, { useState } from 'react'
import { Game } from 'services/gameApi.type'
import { DripsyGradient } from '../Gradient'
import GameCard from './GameCard'

import { FONT_TOP_OFFSET } from 'app/constants/font'
import { MotiView, useAnimationState } from 'moti'
import { Shadow } from 'react-native-shadow-2'
import Icon from '../Icon'

import debounce from 'lodash/debounce'
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

interface GameListSectionGridFilterProps {
  children: React.ReactNode
  onSearch: (t?: string) => void
}

const GameListSectionGridFilter = ({
  children,
  onSearch,
}: GameListSectionGridFilterProps) => {
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
        {onSearch && <GameListSectionGridSearch onSearch={onSearch} />}
      </DripsyGradient>
    </View>
  )
}

const GameListSectionGridSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>()
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      width: 0,
    },
    active: {
      opacity: 1,
      width: 200,
    },
  })

  const onToggle = () => {
    animationState.transitionTo(
      animationState.current === 'from' ? 'active' : 'from'
    )
  }

  const _onSearch = debounce((t) => {
    onSearch && onSearch(t)
  }, 1000)

  return (
    <View sx={{ ml: 'auto', position: 'relative' }}>
      <MotiView state={animationState}>
        <View sx={{ width: '100%', borderRadius: 20, bg: '$primary.700' }}>
          <TextInput
            value={searchValue}
            numberOfLines={1}
            placeholderTextColor="$placeholder"
            sx={{
              fontSize: 14,
              paddingRight: 42,
              paddingLeft: '$3',
              // lineHeight: 18
              height: [24, 24, 24, 30],
              lineHeight: [15, 15, 15, 30],
            }}
            placeholder="Search"
            onChangeText={(t) => {
              setSearchValue(t)
              _onSearch(t)
            }}
          />
        </View>
      </MotiView>
      <Pressable
        onPress={onToggle}
        sx={{
          position: 'absolute',
          right: '$3',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
        }}
      >
        <Icon name="search" size={18} />
      </Pressable>
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
        px: ['$1', '$1', '$1', '$3'],
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
            name={g.name[locale]}
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
GameListSectionGrid.Search = GameListSectionGridSearch
GameListSectionGrid.GameList = GameListSectionGridList
GameListSectionGrid.TagButton = TagButton
