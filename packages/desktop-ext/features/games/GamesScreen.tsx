import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import { DesktopGamesFilter, SUB_ROUTES } from 'app/features/games/subroutes'
import useGameScreen from 'app/features/games/useGameScreen'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import useLocalization from 'app/provider/localization'
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
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Platform } from 'react-native'
import { LatestWinnerType } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import GameList from './GameList'
import { LaunchGame } from 'app/features/game/GameLauncher'
import isDesktop from 'app/utils/isDesktop'

type Props = {}

function GamesScreen({}: Props) {
  const desktop = isDesktop()
  const { route, filteredGames, onFilterClicked, gameCategoryTagTranslation } =
    useGameScreen(SUB_ROUTES.local.route)

  const handleVgaming = () => {
    LaunchGame({
      gc: 'Vgaming:3804',
      gpc: 'SABA',
      gtc: GAME_TYPE_CODE.GAMES,
      xImg: '',
      tags: [],
      gdc_cat: '',
      name: {
        en: 'Fish Prawn Crab',
        vi: 'Fish Prawn Crab',
      },
      img: 'cms/game/saba/Games-Vgaming-FishPrawnCrab_1661158713.jpg',
      desktopMode: desktop,
    })
  }
  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 0.8, minHeight: 300 }}>
          <LatestWinnerSection type={LatestWinnerType.Games} />
        </View>
        <Pressable onPress={handleVgaming} sx={{ flex: 1, minHeight: 300 }}>
          <SolitoImage
            alt="v-gaming"
            fill
            contentFit="cover"
            style={{ width: '100%', height: '100%' }}
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/game/vGaming.jpg`}
          />
        </Pressable>
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
              height: '100%',
            }}
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/games.mp4`,
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
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
            gameCategoryTagTranslation={gameCategoryTagTranslation}
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

export default GamesScreen
