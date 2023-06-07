import SectionHeader from 'app/components/SectionHeader'
import TopGameCard from 'app/components/game/TopGameCard'
import { ScrollView, View } from 'dripsy'
import React from 'react'

const sampleData = [
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/angrybees/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/baiyexingfu/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/cashandkisses/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/fortunedragon/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/pandoraslegacysupremereels/en.jpg',
  },
]

export default function TopGameSection(props) {
  return (
    <View sx={{ mb: '$sectionBottomSpace' }} {...props}>
      <SectionHeader icon="crown" title="RECOMMENDED GAMES" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerSx={{
          gap: ['$2', '$3'],
          px: ['$2', '$3'],
          pt: ['$3'],
        }}
      >
        {sampleData.map((g, i) => (
          <TopGameCard key={i} image={g.image} number={i + 1} />
        ))}
      </ScrollView>
    </View>
  )
}
