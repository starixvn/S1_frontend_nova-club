import bbin from './bbin.json'
import jdbg from './jdbg.json'
import { SlotGame } from './slot.type'

const AllSlotGames: {
  [index: string]: SlotGame[]
} = {
  bbin: bbin as SlotGame[],
  jdbg: jdbg as SlotGame[],
}

export default AllSlotGames
