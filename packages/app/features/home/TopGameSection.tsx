import DraggableScrollView from 'app/components/DraggableScrollView'
import SectionHeader from 'app/components/SectionHeader'
import TopGameCard, { height } from 'app/components/game/TopGameCard'
import useLocalization from 'app/provider/localization'
import { View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/gameApi'

export default function TopGameSection(props) {
  const { t } = useLocalization()
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
      <SectionHeader icon="crown" title={t('game.category.recommended')} />
      <DraggableScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerSx={{
          gap: ['$2', '$3'],
          px: ['$2', '$3'],
          mt: '$3',
          height: height,
        }}
      >
        {data?.map((g, i) => {
          return <TopGameCard key={i} game={g} desktopMode={desktopMode} />
        })}
      </DraggableScrollView>
    </View>
  )
}
