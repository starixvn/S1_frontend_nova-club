import { DripsyGradient } from 'app/components/Gradient'
import SectionLabel from 'app/components/SectionLabel'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import { Row, View } from 'dripsy'
import React, { useMemo } from 'react'

interface RecentlyPlayedSectionProps {
  gameTypes?: GAME_TYPE_CODE[]
  gameCategories?: GDC_GAME_CATEGORY[]
}

export default function RecentlyPlayedSection({
  gameTypes = [],
  gameCategories = [],
}: RecentlyPlayedSectionProps) {
  const recent = useAppSelector((s) => s.setting.recentGames)
  const { t } = useLocalization()

  const displayAble = useMemo(() => {
    if (recent) {
      return recent.filter((g) => {
        console.log('gg', g)
        return (
          (g.gtc && gameTypes.includes(g.gtc)) ||
          (g.gdc_cat && gameCategories.includes(g.gdc_cat))
        )
      })
    }

    return []
  }, [recent, gameTypes, gameCategories])

  if (displayAble.length === 0) return null
  return (
    <DripsyGradient
      gradient="surface"
      sx={{ pb: ['$2', '$3', '$3'], mb: '$sectionBottomSpace' }}
    >
      <View sx={{ height: 1, bg: '$primary.100' }} />
      <View sx={{ ml: '$pagePadding' }}>
        <SectionLabel
          icon="recently"
          title={t('game.recently').toUpperCase()}
          sx={{ p: [6, '$2'], my: [0] }}
          iconProps={{ sx: { fontSize: [12, 14] } }}
        />
      </View>
      <Row>
        {/* <View sx={{ position: 'relative', zIndex: 1, ml: ['$3'] }}>
          <DripsyGradient
            gradient="shading"
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            sx={{
              position: 'absolute',
              zIndex: 13,
              height: [50, 70],
              width: 20,
              left: '100%',
            }}
          />
          <GameCard
            sx={{ mx: '$1' }}
            width={[50, 70]}
            height={[50, 70]}
            // image={vgaming}
          />
        </View> */}
        <HorizontalGameList data={displayAble} size={[50, 70]} />
      </Row>
    </DripsyGradient>
  )
}
