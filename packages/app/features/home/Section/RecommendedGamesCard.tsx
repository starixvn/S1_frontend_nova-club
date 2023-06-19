import { DripsyGradient } from 'app/components/Gradient'
import Image from 'app/components/common/Image'
import { LaunchGame } from 'app/features/games/GameLauncher'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { Text, View } from 'dripsy'
import React from 'react'

type RecommendedGamesCardProps = {
  number?: number
} & LaunchGamePayload

const RecommendedGamesCard = ({
  gameCode,
  providerCode,
  image,
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
            width: [100, 100, 120],
            aspectRatio: 3 / 4,
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: image }}
            alt={image}
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
    <View
      sx={{
        position: 'absolute',
        left: '10%',
        top: '-1.5%',
        bg: '#F33043',
        zIndex: 1,
        width: '30%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        aspectRatio: 36 / 44,
        boxShadow: 'md',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text sx={{ fontSize: [16, 18], color: 'white', fontWeight: 'bold' }}>
        {children}
      </Text>
    </View>
  )
}

export default RecommendedGamesCard
