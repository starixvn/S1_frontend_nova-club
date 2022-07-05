import haba from './haba.json'
import bbin from './bbin.json'
import { GameConfig } from 'app/global'

const AllLiveCasinoGames: {
  [index: string]: GameConfig[]
} = {
  haba,
  bbin,
}

export default AllLiveCasinoGames
