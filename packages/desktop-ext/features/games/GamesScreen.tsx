import Icon from 'app/components/Icon'
import { DesktopGamesFilter, SUB_ROUTES } from 'app/features/games/subroutes'
import useGameScreen from 'app/features/games/useGameScreen'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import { withGameFilterProvider } from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import LatestWinnerSection from 'desktop-ext/components/game/LatestWinnerSection'
import {
  ActivityIndicator,
  Container,
  Pressable,
  Row,
  Text,
  View,
} from 'dripsy'
import React from 'react'
import { LatestWinnerType } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import GameList from './GameList'
import useLocalization from 'app/provider/localization'
import { Video } from 'expo-av'
import { Platform } from 'react-native'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {}

function _GamesScreen({}: Props) {
  const { route, filteredGames, onFilterClicked } = useGameScreen(
    SUB_ROUTES.local.route
  )
  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 0.8, minHeight: 300 }}>
          <LatestWinnerSection type={LatestWinnerType.Games} />
        </View>
        <View sx={{ flex: 1, minHeight: 300, bg: '$secondary.500' }}></View>
        <View sx={{ flex: 1, minHeight: 300 }}>
          <Video
            isMuted
            isLooping
            shouldPlay
            style={{
              width: '100%',
              height: '100%',
            }}
            videoStyle={{
              position: Platform.OS === 'web' ? 'relative' : 'absolute',
            }}
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/games.mp4`,
            }}
          />
        </View>
      </Row>
      <RecentlyPlayedSection
        gameTypes={[
          GAME_TYPE_CODE.GAMES,
          GAME_TYPE_CODE.FISHING,
          GAME_TYPE_CODE.LOTTERY,
        ]}
        gameCategories={[GDC_GAME_CATEGORY.CARDGAME]}
      />
      {filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <GameTypeFilter onFilterClicked={onFilterClicked} />
          <GameList
            sx={{ flex: 1 }}
            games={filteredGames}
            label={route.label}
          />
        </Row>
      )}
    </Container>
  )
}

const GameTypeFilter = ({ onFilterClicked, ...rest }) => {
  const { t } = useLocalization()
  return (
    <View sx={{ gap: '$3', width: [175, 175, 175, 175, 200] }} {...rest}>
      {DesktopGamesFilter.map((r, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => onFilterClicked(r, i)}
            sx={{
              width: [175, 175, 175, 175, 200],
              aspectRatio: 240 / 80,
              position: 'relative',
            }}
          >
            <SolitoImage
              style={{ position: 'absolute' }}
              fill
              src={require('app/assets/images/game/bgAllProviders.jpg')}
              alt={'bg'}
            />
            <Row sx={{ alignItems: 'center', flex: 1, px: '$2' }}>
              <View
                sx={{
                  flex: 0.9,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={40} name={r.icon} />
              </View>
              <Text
                sx={{
                  fontSize: 18,
                  lineHeight: 22,
                  fontWeight: '900',
                  flex: 1.1,
                }}
              >
                {t(r.label)}
              </Text>
            </Row>
          </Pressable>
        )
      })}
    </View>
  )
}

const GamesScreen = withGameFilterProvider(_GamesScreen, {
  gameTypes: [
    GAME_TYPE_CODE.GAMES,
    GAME_TYPE_CODE.FISHING,
    GAME_TYPE_CODE.LOTTERY,
  ],
  gameCategories: [GDC_GAME_CATEGORY.CARDGAME],
})

export default GamesScreen
