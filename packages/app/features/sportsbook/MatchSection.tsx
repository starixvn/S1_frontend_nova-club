import MatchCarousel from 'app/components/match/MatchCarousel'
import { LEAGUE_SECTION, MatchLeagueId } from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { View } from 'dripsy'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
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
  const [leagueSection, setLeagueSection] = useParam('section', {
    initial: LEAGUE_SECTION.LEAGUE_ODDS,
  })

  useEffect(() => {
    if (Platform.OS === 'web')
      leagueSection !== LEAGUE_SECTION.LEAGUE_ODDS &&
        setSelectedLeague(MatchLeagueId.EURO_CUP.toString())
    else
      leagueSection === undefined &&
        setLeagueSection(LEAGUE_SECTION.LEAGUE_ODDS)
  }, [leagueSection])

  const { leagues, data } = useGetRecoMatchQuery(
    { isApp: !desktop },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const filteredIds = useMemo(() => {
    const euroLeagueIndex = leagues.ids?.findIndex(
      (el) => el.toString() === MatchLeagueId.EURO_CUP.toString()
    )

    const finalData = leagues.ids?.slice(0, euroLeagueIndex)

    return finalData ?? []
  }, [leagues])

  const leagueId = selectedLeague ?? filteredIds[0] ?? ''

  const handleLeagueSelector = (v, leagueSection) => {
    setSelectedLeague(v)
    setLeagueSection(leagueSection)
  }

  return (
    <View>
      <MatchLeagueSelector
        ids={filteredIds}
        onChange={handleLeagueSelector}
        value={leagueId}
        gradient={'surface'}
      />

      {leagueSection === LEAGUE_SECTION.LEAGUE_ODDS && (
        <>
          <View sx={{ mb: '$4' }} />
          <MatchCarousel data={leagues.entities[leagueId]} />
        </>
      )}
    </View>
  )
}
