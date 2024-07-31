import MatchCarousel from 'app/components/match/MatchCarousel'
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
    const finalData = data

    return finalData ?? []
  }, [data])

  return <MatchCarousel data={filteredData} gaEvent={GAEvents.CTA_MatchHome} />
}
