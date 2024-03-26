import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import SectionLabel from 'app/components/SectionLabel'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Row, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo, useState } from 'react'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'utils/constant'

interface RecentlyPlayedSectionProps {
  gameTypes?: GAME_TYPE_CODE[]
  gameCategories?: GDC_GAME_CATEGORY[]
}

export default function RecentlyPlayedSection({
  gameTypes = [],
  gameCategories = [],
}: RecentlyPlayedSectionProps) {
  const isDesktop = useIsDesktop()
  const recent = useAppSelector((s) => s.setting.recentGames)
  const { t } = useLocalization()
  const [showList, setShowList] = useState(isDesktop)

  const handleShow = () => {
    setShowList(!showList)
  }

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
    <DripsyGradient gradient="surface" sx={{ mb: '$sectionBottomSpace' }}>
      <View sx={{ height: 1, bg: '$primary.100' }} />
      <Pressable onPress={handleShow} disabled={isDesktop}>
        <View sx={{ ml: '$pagePadding' }}>
          <SectionLabel
            icon="recently"
            title={t('game.recently').toUpperCase()}
            sx={{ p: [6, '$2'], my: [0] }}
            iconProps={{ sx: { fontSize: [12, 14] }, name: 'recently' }}
          >
            {!isDesktop && (
              <View
                sx={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  mr: '$2',
                }}
              >
                <MotiView
                  animate={{
                    transform: [{ rotateZ: showList ? '90deg' : '270deg' }],
                  }}
                  transition={{ type: 'timing', duration: 500 }}
                >
                  <Icon name={'back'} />
                </MotiView>
              </View>
            )}
          </SectionLabel>
        </View>
      </Pressable>
      {showList && (
        <Row sx={{ pb: ['$2', '$3', '$3'] }}>
          <HorizontalGameList data={displayable} size={[50, 70]} />
        </Row>
      )}
    </DripsyGradient>
  )
}
