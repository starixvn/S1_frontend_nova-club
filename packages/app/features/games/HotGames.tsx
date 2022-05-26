import ListImage from 'app/components/ListImage'
import hotgame from 'app/config/games/hotgame'
import { View } from 'dripsy'
import Section from './Section'

const HotGames = () => {
  return (
    <View sx={{ mt: '$10' }}>
      <Section title="hot games" />
      <ListImage data={hotgame.gameList} />
    </View>
  )
}

export default HotGames
