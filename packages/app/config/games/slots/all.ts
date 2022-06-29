import bbin from './bbin.json'
import jdbg from './jdbg.json'
import cq9 from './cq9.json'
import { SlotGame } from './slot.type'

const AllSlotGames: {
  [index: string]: SlotGame[]
} = {
  bbin,
  jdbg,
  cq9,
}

export default AllSlotGames
