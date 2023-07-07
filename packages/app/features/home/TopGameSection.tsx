import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SectionHeader from 'app/components/SectionHeader'
import TopGameCard from 'app/components/game/TopGameCard'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/gameApi'

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
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/steampunkbandits/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/cosmicboost/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/gemoireunchainedsupremeways/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/sweetbaker/en.jpg',
  },
  {
    image:
      'https://static-global.static-bifrost.com/pwa_statics/games/170x350/vampiretreats/en.jpg',
  },
]

export default function TopGameSection(props) {
  const { data } = useFeaturedGameListQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        data: s.data?.filter((g) => g.cat === '2'),
      }
    },
  })

  const desktopMode = useResponsiveValue([false, false, false, true])

  return (
    <View {...props}>
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
        {data?.map((g, i) => {
          return <TopGameCard key={i} game={g} desktopMode={desktopMode} />
        })}
      </ScrollView>
    </View>
  )
}
