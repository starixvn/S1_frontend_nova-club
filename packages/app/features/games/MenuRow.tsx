import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Image, styled, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Game } from 'services/contentApi.type'

const DATA = [
  {
    label: 'common.all',
    img: require('../../assets/images/games/all-icon.png'),
    bgImg: require('../../assets/images/games/games/red-ellipse.png'),
    gameType: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.COCKFIGHTING,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
  },
  {
    label: 'game.category.fishingGames',
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
  {
    label: 'game.category.cockfighting',
    img: require('../../assets/images/games/cockfighting.png'),
    bgImg: require('../../assets/images/games/games/light-green-ellipse.png'),
    gameType: [GAME_TYPE_CODE.COCKFIGHTING],
  },
]

interface MenuRowProps {
  setFilterGames: Dispatch<SetStateAction<Game[]>>
  gameList?: Game[]
}

const MenuRow = ({ setFilterGames, gameList }: MenuRowProps) => {
  const { t } = useLocalization()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onFilterGame = (item: typeof DATA[number], index: number) => {
    if (!gameList?.length) return

    const gameType = item.gameType

    const filteredGames = gameList.filter((gamesLists) =>
      gameType.includes(gamesLists.gtc as GAME_TYPE_CODE)
    )

    setFilterGames(filteredGames)
    setSelectedIndex(index)
  }

  useEffect(() => {
    if (gameList?.length) {
      setFilterGames(gameList)
    }
  }, [gameList, setFilterGames])

  return (
    <StyledListView>
      {DATA.map((i, index) => {
        return (
          <BouncePressable
            key={i.label}
            style={{
              alignItems: 'center',
            }}
            onPress={() => onFilterGame(i, index)}
          >
            <View sx={{ position: 'relative' }}>
              <MotiView
                animate={{
                  scale: index === selectedIndex ? 1.2 : 1,
                }}
                exit={{
                  scale: 1,
                }}
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
                    scale: index === selectedIndex ? 1.3 : 1,
                  }}
                  exit={{
                    scale: 1,
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
          </BouncePressable>
        )
      })}
    </StyledListView>
  )
}

const StyledImage = styled(Image)({
  height: [85, 120],
  width: [85, 120],
})
const StyledBackgroundImage = styled(Image)({
  transform: [{ scale: 0.7 }],
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
  width: '90%',
  mt: '$0a',
  mb: '$2a',
})

const StyledListView = styled(View)({
  mx: '$2a',
  my: '$2a',
  mb: '$2',
  flexDirection: 'row',
  justifyContent: 'space-around',
})
export default MenuRow
