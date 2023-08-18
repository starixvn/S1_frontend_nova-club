import { FONT_TOP_OFFSET } from 'app/constants/font'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Row, Text, TextInput, View, useDripsyTheme } from 'dripsy'
import debounce from 'lodash/debounce'
import React, { ReactElement, useState } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Game } from 'services/gameApi.type'
import DraggableScrollView from '../DraggableScrollView'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import GameCard from './GameCard'
type Props = { children: ReactElement }

export default function GameListSectionGrid({ children }: Props) {
  return <View>{children}</View>
}

const GameListSectionGridHeader = ({ onSearch, children }) => {
  const isDesktop = useIsDesktop()

  return (
    <View
      sx={{
        flexDirection: 'row',
      }}
    >
      <View
        sx={{
          bg: '$primary.200',
          borderTopRightRadius: [15, 20],
          width: [120, 130],
          px: '2%',
          py: '$2',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 'auto',
        }}
      >
        {children}
      </View>
      {onSearch && isDesktop && (
        <GameListSectionGridSearch onSearch={onSearch} />
      )}
    </View>
  )
}

interface GameListSectionGridFilterProps {
  children: React.ReactNode
  onSearch?: (t?: string) => void
}

const GameListSectionGridFilter = ({
  onSearch,
}: GameListSectionGridFilterProps) => {
  onSearch && <GameListSectionGridSearch onSearch={onSearch} />
}

const GameListSectionGridSearch = ({ onSearch }) => {
  const { t } = useLocalization()
  const [searchValue, setSearchValue] = useState<string>()
  const { theme } = useDripsyTheme()

  const _onSearch = debounce((t) => {
    onSearch && onSearch(t)
  }, 1000)

  return (
    <View
      sx={{
        justifyContent: 'center',
        mr: '$2',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '$primary.100',
        my: '$1',
        width: '100%',
        maxWidth: 150,
      }}
    >
      <View
        sx={{
          px: [10, '$3'],
          bg: '$primary.700',
          borderRadius: 30,
          width: '100%',
        }}
      >
        <View sx={{ width: '100%', borderRadius: 20 }}>
          <TextInput
            cursorColor={theme?.colors?.$primary?.[200]}
            selectionColor={theme?.colors?.$primary?.[200]}
            autoCapitalize={'none'}
            value={searchValue}
            numberOfLines={1}
            placeholderTextColor="white"
            sx={{
              fontSize: 14,
              paddingRight: 42,
              paddingLeft: '$3',
              width: '100%',
              // lineHeight: 18
              height: [26, 26, 26, 30],
              lineHeight: [15, 15, 15, 30],
            }}
            placeholder={t('common.search')}
            onChangeText={(t) => {
              setSearchValue(t)
              _onSearch(t)
            }}
          />
        </View>

        <Pressable
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
    </View>
  )
}

const width = ['22%', '18%', '15%', '15%', '12%']
const spaces = ['1.5%', '1%', '0.83%', '0.83%', '1.14%']

const GameListSectionGridList = ({
  data,
  bordered = false,
  itemWidth = width,
  itemSpace = spaces,
  aspectRatio = 1,
}: {
  data: Game[]
  itemWidth?: string[]
  itemSpace?: string[]
  bordered?: boolean
  aspectRatio?: number
}) => {
  const locale = useAppSelector((s) => s.setting.locale)
  const { t } = useLocalization()
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        px: ['$1', '$1', '$1', '$3'],
        pt: ['$2'],
        pb: ['$2'],
        borderWidth: bordered ? 2 : 0,
        borderColor: '$primary.300',
      }}
    >
      {data?.length > 0 ? (
        data.map((g, i) => {
          return (
            <GameCard
              key={i}
              displayName={g.name[locale]}
              width={itemWidth}
              sx={{
                m: itemSpace,
              }}
              containerSx={{
                aspectRatio,
              }}
              {...g}
            />
          )
        })
      ) : (
        <Text sx={{ color: '$placeholder', my: '$3' }}>{t('game.noGame')}</Text>
      )}
    </Row>
  )
}

const TagBody = ({ children }) => {
  return (
    <View sx={{ borderTopWidth: 1, borderColor: '$primary.100' }}>
      <DripsyGradient
        gradient="surface"
        sx={{
          // px: '$3',
          py: '$2',
        }}
      >
        <DraggableScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerSx={{
            // width: '100%',
            gap: ['$3'],
            px: ['$2', '$3'],
            // pt: ['$2', '$3'], // Beware on parent height at GameListSection
          }}
          bounces={false}
          // {...rest}
        >
          {children}
        </DraggableScrollView>
      </DripsyGradient>
    </View>
  )
}

const TagButton = ({ isActive, children = '', ...rest }) => {
  const { theme } = useDripsyTheme()
  return (
    <Pressable sx={{ marginBottom: 2 }} {...rest}>
      <Shadow
        safeRender
        style={{ borderRadius: 30, overflow: 'hidden' }}
        offset={[0, 1]}
        distance={1}
        startColor={theme?.colors?.$primary?.[100]}
        stretch
      >
        <View
          sx={{
            px: [10, '$3'],
            py: 6,
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
GameListSectionGrid.TagBody = TagBody
GameListSectionGrid.TagButton = TagButton
