import useLocalization from 'app/provider/localization'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Image, styled, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Game } from 'services/contentApi.type'
import { createParam } from 'solito'

const DATA = [
  {
    label: 'common.all',
    img: require('../../assets/images/games/all-icon.png'),
    bgImg: require('../../assets/images/games/games/red-ellipse.png'),
    gameType: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
  },
  {
    label: 'game.category.localGame',
    img: require('../../assets/images/games/localgames.png'),
    bgImg: require('../../assets/images/games/games/purple-ellipse.png'),
    gameType: [GAME_TYPE_CODE.GAMES],
  },
  {
    label: 'game.category.fishing',
    img: require('../../assets/images/games/fishing.png'),
    bgImg: require('../../assets/images/games/games/yellow-ellipse.png'),
    gameType: [GAME_TYPE_CODE.FISHING],
  },
  {
    label: 'game.category.keno/lottery',
    img: require('../../assets/images/games/lottery.png'),
    bgImg: require('../../assets/images/games/games/green-ellipse.png'),
    gameType: [GAME_TYPE_CODE.LOTTERY],
  },
]

interface MenuRowProps {
  setFilterGames: Dispatch<SetStateAction<Game[]>>
  gameList?: Game[]
}

const { useParam } = createParam<{ t: string }>()

const MenuRow = ({ setFilterGames, gameList }: MenuRowProps) => {
  const { t } = useLocalization()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [gameType] = useParam('t', {
    initial: '',
  })

  const onFilterGame = (index: number, item?: typeof DATA[number]) => {
    if (
      !gameList?.length ||
      typeof item === 'undefined' ||
      index === selectedIndex
    )
      return

    const gameType = item.gameType

    const filteredGames = gameList.filter((gamesLists) =>
      gameType.includes(gamesLists.gtc as GAME_TYPE_CODE)
    )

    setFilterGames(filteredGames)
    setSelectedIndex(index)
  }

  const getInitialSelectedGameType = useCallback(() => {
    if (gameList?.length) {
      if (gameType) {
        const selectedGameIndex = DATA.findIndex((data) => {
          if (data.gameType.length > 1) return false

          return data.gameType.includes(gameType as GAME_TYPE_CODE)
        })
        const selectedGame = DATA[selectedGameIndex] ?? DATA[0]
        const gameIndex = selectedGameIndex === -1 ? 0 : selectedGameIndex

        onFilterGame(gameIndex, selectedGame)
      } else {
        setFilterGames(gameList)
      }
    }
  }, [gameList, gameType])

  useEffect(() => {
    getInitialSelectedGameType()
  }, [getInitialSelectedGameType])

  return (
    <StyledListView>
      {DATA.map((i, index) => {
        return (
          <TouchableOpacity
            key={i.label}
            onPress={() => onFilterGame(index, i)}
            containerStyle={{
              flex: 1,
              margin: 4,
            }}
          >
            <View sx={{ position: 'relative' }}>
              <MotiView
                animate={{
                  scale: index === selectedIndex ? 1 : 0.85,
                }}
                exit={{
                  scale: 1,
                }}
                style={{ alignItems: 'center' }}
              >
                <StyledImage source={i.img} resizeMode={'contain'} />
              </MotiView>
              <StyledBackgroundWrapper>
                <MotiView
                  transition={{
                    damping: 6,
                    mass: 0.5,
                    stiffness: 200,
                    type: 'spring',
                  }}
                  animate={{
                    scale: index === selectedIndex ? 0.95 : 0.7,
                  }}
                  exit={{
                    scale: 0.95,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <StyledBackgroundImage
                    source={i.bgImg}
                    resizeMode={'contain'}
                  />
                </MotiView>
              </StyledBackgroundWrapper>
            </View>

            <StyledText>{t(i.label)}</StyledText>
          </TouchableOpacity>
        )
      })}
    </StyledListView>
  )
}

const StyledImage = styled(Image)({
  height: [80, 100],
  width: [80, 100],
})
const StyledBackgroundImage = styled(Image)({
  width: '100%',
  height: '100%',
})
const StyledBackgroundWrapper = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: -1,
})

const StyledText = styled(Text)({
  textAlign: 'center',
  alignSelf: 'center',
  fontSize: 12,
  fontWeight: 'bold',
  mt: '$1',
  mb: '$2',
})

const StyledListView = styled(View)({
  mx: '$2a',
  my: '$2a',
  mb: '$2',
  flexDirection: 'row',
  justifyContent: 'space-around',
})
export default MenuRow
