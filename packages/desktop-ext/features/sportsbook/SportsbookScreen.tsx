import { Container, View } from 'dripsy'
import React from 'react'
import GameList from './GameList'
import MatchList from './MatchList'

export default function SportsbookScreen() {
  return (
    <View>
      <GameList />
      <Container>
        <MatchList />
      </Container>
    </View>
  )
}
