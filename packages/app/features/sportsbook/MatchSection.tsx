import MatchCarousel from 'app/components/match/MatchCarousel'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import { GAEvents } from 'app/integrations/analytic/events'
import { View } from 'dripsy'
import { default as React, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchLeagueSelector from './MatchLeagueSelector'

export default function MatchSection() {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const [selectedLeague, setSelectedLeague] = useState<string>()

  useEffect(() => {
    setSelectedLeague(undefined)
  }, [])

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

  const handleLeagueSelector = (v) => {
    setSelectedLeague(v)
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

      <View sx={{ mb: '$4' }} />
      <MatchCarousel
        data={leagues.entities[leagueId]}
        gaEvent={GAEvents.CTA_MatchSportsbook}
      />
    </View>
  )
}
