import MatchCarousel from 'app/components/match/MatchCarousel'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchLeagueSelector from './MatchLeagueSelector'

export default function MatchSection() {
  const [selectedLeague, setSelectedLeague] = useState<string>()
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { leagues } = useGetRecoMatchQuery(
    { isApp: Platform.OS !== 'web', currency },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

  if (leagues.ids?.length === 0) return null

  return (
    <View>
      <MatchLeagueSelector
        ids={leagues.ids}
        onChange={setSelectedLeague}
        value={leagueId}
        gradient={'surface'}
      />

      <View sx={{ mb: '$4' }} />

      <MatchCarousel data={leagues.entities[leagueId]} />
    </View>
  )
}
