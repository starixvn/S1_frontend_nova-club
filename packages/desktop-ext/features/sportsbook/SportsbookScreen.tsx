import { Container } from 'dripsy'
import React from 'react'
import GameList from './GameList'
import MatchList from './MatchList'

export default function SportsbookScreen() {
  return (
    <Container>
      <GameList />
      <MatchList />
    </Container>
  )
}
