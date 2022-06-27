import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import fishing from 'app/config/games/fishing'
import { View } from 'dripsy'
import Slots from '../slots'
import Section from './Section'

const SlotGames = () => {
  return (
    <View sx={{ mt: '$5' }}>
      <Section title="hot slot games" sx={{ mb: 0 }} />
      <SimpleWrap data={fishing.gameList} showTitle={false} />
    </View>
  )
}

export default SlotGames
