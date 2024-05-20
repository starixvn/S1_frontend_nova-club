import MatchCarousel from 'app/components/match/MatchCarousel'
import { LEAGUE_SECTION, MatchLeagueId } from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import { createParam } from 'solito'
import MatchLeagueSelector from './MatchLeagueSelector'

type Params = {
  section?: string
}

const { useParam } = createParam<Params>()

export default function MatchSection() {
  const desktop = useIsDesktop()
  const [selectedLeague, setSelectedLeague] = useState<string>()
  const [leagueSection, setleagueSection] = useParam('section', {
    initial: LEAGUE_SECTION.LEAGUE_ODDS,
  })

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

  const filteredIds = useMemo(() => {
    const euroLeagueIndex = leagues.ids?.findIndex(
      (el) => el.toString() === MatchLeagueId.EURO_CUP.toString()
    )

    const finalData = leagues.ids?.slice(0, euroLeagueIndex)

    return finalData ?? []
  }, [leagues])

  const handleLeagueSelector = (v, leagueSection) => {
    setSelectedLeague(v)
    setleagueSection(leagueSection)
  }

  return (
    <View>
      <MatchLeagueSelector
        ids={filteredIds}
        onChange={handleLeagueSelector}
        value={leagueId}
        gradient={'surface'}
      />

      <View sx={{ mb: '$4' }} />

      {leagueSection === LEAGUE_SECTION.LEAGUE_ODDS && (
        <MatchCarousel data={leagues.entities[leagueId]} />
      )}
    </View>
  )
}
