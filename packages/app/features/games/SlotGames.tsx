import SimpleGridImage from 'app/components/SimpleGridImage'
import fishing from 'app/config/games/fishing'
import { View } from 'dripsy'
import Section from './Section'

const SlotGames = () => {
  return (
    <View sx={{ mt: '$10' }}>
      <Section title="hot slot games" />
      <SimpleGridImage data={fishing.gameList} />
    </View>
  )
}

export default SlotGames
