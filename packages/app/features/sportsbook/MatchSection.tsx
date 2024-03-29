import MatchCarousel from 'app/components/match/MatchCarousel'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchLeagueSelector from './MatchLeagueSelector'
import { useAppSelector } from 'app/provider/redux/store'

export default function MatchSection() {
  const desktop = useIsDesktop()
  const [selectedLeague, setSelectedLeague] = useState<string>()
  const currency = useAppSelector((s) => s.setting.currency)
  const { leagues, data } = useGetRecoMatchQuery(
    { isApp: !desktop, currency },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

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
