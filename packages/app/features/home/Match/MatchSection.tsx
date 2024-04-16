import MatchCarousel from 'app/components/match/MatchCarousel'
import React from 'react'
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

  return <MatchCarousel data={data} />
}
