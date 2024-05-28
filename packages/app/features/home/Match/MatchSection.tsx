import MatchCarousel from 'app/components/match/MatchCarousel'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import { GAEvents } from 'app/integrations/analytic/events'
import { default as React, useMemo } from 'react'
import { Platform } from 'react-native'
import { useGetRecoMatchQuery } from 'services/matchApi'

import useFocusedSelector from 'app/hooks/useFocusedSelector'

type Props = {}

export default function MatchSection({}: Props) {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { data } = useGetRecoMatchQuery({
    isApp: Platform.OS !== 'web',
    currency,
  })

  const filteredData = useMemo(() => {
    const euroLeagueIndex = data?.findIndex(
      (el) => el.LeagueId === MatchLeagueId.EURO_CUP
    )

    const finalData = data?.slice(0, euroLeagueIndex)

    return finalData ?? []
  }, [data])

  return <MatchCarousel data={filteredData} gaEvent={GAEvents.CTA_MatchHome} />
}
