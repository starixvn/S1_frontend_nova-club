import ListImage from 'app/components/ListImage'
import fishing from 'app/config/games/fishing'
import { View } from 'dripsy'
import Section from './Section'

const FishingGames = () => {
  return (
    <View sx={{ mt: '$10' }}>
      <Section title="hot fishing games" />
      <ListImage data={fishing.gameList} />
    </View>
  )
}

export default FishingGames
