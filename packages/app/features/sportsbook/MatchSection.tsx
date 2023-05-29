import MatchCarousel from 'app/components/match/MatchCarousel'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchLeagueSelector from './MatchLeagueSelector'
import { AnimatePresence, MotiView } from 'moti'

export default function MatchSection() {
  const [selectedLeague, setSelectedLeague] = useState<string>()

  const { leagues } = useGetRecoMatchQuery(undefined, {
    selectFromResult: (resp) => ({
      ...resp,
      leagues: matchGroupByLeague(resp),
    }),
  })

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

  return (
    <View>
      <MatchLeagueSelector
        ids={leagues.ids}
        onChange={setSelectedLeague}
        value={leagueId}
      />

      <MatchCarousel data={leagues.entities[leagueId]} />
    </View>
  )
}
