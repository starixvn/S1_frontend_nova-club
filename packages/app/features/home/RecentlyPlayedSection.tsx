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

  const displayable = useMemo(() => {
    if (recent) {
      return recent.filter((g) => {
        return (
          (g.gtc && gameTypes.includes(g.gtc)) ||
          (g.gdc_cat && gameCategories.includes(g.gdc_cat))
        )
      })
    }

    return []
  }, [recent, gameTypes, gameCategories])

  if (displayable.length === 0) return null
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
          iconProps={{ sx: { fontSize: [12, 14] }, name: 'recently' }}
        />
      </View>
      <Row>
        <HorizontalGameList data={displayable} size={[50, 70]} />
      </Row>
    </DripsyGradient>
  )
}
