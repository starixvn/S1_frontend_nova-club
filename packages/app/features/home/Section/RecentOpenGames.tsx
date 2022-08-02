import lottery from 'app/config/games/lottery'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import { Game } from 'services/contentApi.type'
import SectionHeader from './SectionHeader'

const RecentOpenGames = () => {
  const recent = useAppSelector((s) => s.setting.recentGames)
  // const resources = useAppSelector((s) => s.setting.recentGameResources)
  const { t } = useLocalization()
  const games = useMemo(() => {
    return recent
      .map((r) => {
        return {
          gc: r.gameCode || '',
          gpc: r.providerCode || '',
          img: r.image,
        } as Game
      })
      .reverse()
  }, [])

  if (games.length === 0) return null

  // console.log('games', games, recent)
  return (
    <View>
      <SectionHeader
        title={t('common.recentlyOpened')}
        colors={['#03e0e8', '#da0af8']}
        iconName="replay"
      />
      <HorizontalGameList data={games} />
    </View>
  )
}

export default RecentOpenGames
