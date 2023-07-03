import MatchCarousel from 'app/components/match/MatchCarousel'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchLeagueSelector from './MatchLeagueSelector'
import isDesktop from 'app/utils/isDesktop'

export default function MatchSection() {
  const desktop = isDesktop()
  const [selectedLeague, setSelectedLeague] = useState<string>()

  const { leagues, data } = useGetRecoMatchQuery(
    { isApp: !desktop },
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

      <MatchCarousel data={leagues.entities[leagueId]} />
    </View>
  )
}
