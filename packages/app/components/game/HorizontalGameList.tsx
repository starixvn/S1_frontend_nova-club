import { ScrollView } from 'dripsy'
import React from 'react'
import GameCard from './GameCard'

export default function HorizontalGameList({
  data,
  size = [80, 100],
  ...rest
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerSx={{ gap: ['$2', '$3'], px: ['$2', '$3'] }}
      {...rest}
    >
      {data.map((g) => {
        return (
          <GameCard
            width={size}
            height={size}
            key={g.gc}
            // name={g.name['en']}
            image={g.img}
          />
        )
      })}
    </ScrollView>
  )
}
