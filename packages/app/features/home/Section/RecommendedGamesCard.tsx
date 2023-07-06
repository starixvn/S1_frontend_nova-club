import { DripsyGradient } from 'app/components/Gradient'
import Image from 'app/components/common/Image'
import { LaunchGame } from 'app/features/games/GameLauncher'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'

type RecommendedGamesCardProps = {
  number?: number
  imageAlt?: string
} & LaunchGamePayload

const RecommendedGamesCard = ({
  gameCode,
  providerCode,
  image,
  imageAlt,
  gameType,
  gameName,
  number,
}: RecommendedGamesCardProps) => {
  const gamePayload = {
    gameCode,
    providerCode,
    image,
    gameName,
    gameType,
  }

  return (
    <TouchableOpacity onPress={() => LaunchGame(gamePayload)}>
      <View sx={{ position: 'relative', mr: 12 }}>
        <View
          sx={{
            mt: 4,
            width: [70, 100, 120],
            aspectRatio: 17 / 35,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: imageAlt ?? image }}
            resizeMode="cover"
            sx={{ width: '100%', height: '100%' }}
          />
        </View>
        <PaginationItem>{number}</PaginationItem>
      </View>
    </TouchableOpacity>
  )
}

const PaginationItem = ({ children }) => {
  return (
    <StyledImageBackground
      sx={{
        position: 'absolute',
        left: '10%',
        width: [32, 48],
        // bg: '#F33043',
        // zIndex: 1,
        // width: '30%',
        // borderBottomRightRadius: 50,
        // borderBottomLeftRadius: 50,
        aspectRatio: 128 / 119,
        // boxShadow: 'md',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      source={require('app/assets/images/games/common/rank-icon.png')}
    >
      <Text
        sx={{
          ml: [-8, -12],
          fontSize: [16, 18],
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {children}
      </Text>
    </StyledImageBackground>
  )
}

const StyledImageBackground = styled(ImageBackground)({})
export default RecommendedGamesCard
