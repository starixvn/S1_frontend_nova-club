import MatchCarousel from 'app/components/match/MatchCarousel'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import { Platform } from 'react-native'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const currency = useAppSelector((s) => s.setting.currency)
  const { data } = useGetRecoMatchQuery({
    isApp: Platform.OS !== 'web',
    currency,
  })

  return <MatchCarousel data={data} />
}
