import bbin from './bbin.json'
import jdbg from './jdbg.json'
import cq9 from './cq9.json'
import haba from './haba.json'
import { GameConfig } from 'app/global'

const AllSlotGames: {
  [index: string]: GameConfig[]
} = {
  bbin,
  jdbg,
  cq9,
  haba,
}

export default AllSlotGames
