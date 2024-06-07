import MatchCarousel from 'app/components/match/MatchCarousel'
import { LEAGUE_SECTION, MatchLeagueId } from 'app/constants/recMatchMapping'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import { GAEvents } from 'app/integrations/analytic/events'
import { View } from 'dripsy'
import { default as React, useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import { createParam } from 'solito'
import MatchLeagueSelector from './MatchLeagueSelector'

type Params = {
  section?: string
}

const { useParam } = createParam<Params>()

export default function MatchSection() {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const [selectedLeague, setSelectedLeague] = useState<string>()
  const [leagueSection, setLeagueSection] = useParam('section', {
    parse: (templateFromUrl) => {
      if (templateFromUrl) return templateFromUrl
      return LEAGUE_SECTION.LEAGUE_ODDS
    },
    initial: LEAGUE_SECTION.LEAGUE_ODDS,
  })

  useEffect(() => {
    if (leagueSection === undefined) {
      setLeagueSection(LEAGUE_SECTION.LEAGUE_ODDS)
      setSelectedLeague(undefined)
    }

    if (leagueSection && leagueSection !== LEAGUE_SECTION.LEAGUE_ODDS)
      setSelectedLeague(MatchLeagueId.EURO_CUP)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueSection])

  const { leagues } = useGetRecoMatchQuery(
    { isApp: Platform.OS !== 'web', currency },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  // const filteredIds = useMemo(() => {
  //   const euroLeagueIndex = leagues.ids?.findIndex(
  //     (el) => el.toString() === MatchLeagueId.EURO_CUP.toString()
  //   )

  //   const finalData =
  //     euroLeagueIndex > -1
  //       ? leagues.ids?.slice(0, euroLeagueIndex)
  //       : leagues.ids

  //   return finalData ?? []
  // }, [leagues])

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

  const handleLeagueSelector = (v, leagueSection) => {
    setSelectedLeague(v)
    setLeagueSection(leagueSection)
  }

  if (leagues.ids?.length === 0) return null

  return (
    <View>
      <MatchLeagueSelector
        ids={leagues.ids}
        onChange={handleLeagueSelector}
        value={leagueId}
        gradient={'surface'}
      />

      {leagueSection === LEAGUE_SECTION.LEAGUE_ODDS && (
        <>
          <View sx={{ mb: '$4' }} />
          <MatchCarousel
            data={leagues.entities[leagueId]}
            gaEvent={GAEvents.CTA_MatchSportsbook}
          />
        </>
      )}
    </View>
  )
}
