import MatchCarousel from 'app/components/match/MatchCarousel'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const desktop = useIsDesktop()
  const currency = useAppSelector((s) => s.setting.currency)
  const { data } = useGetRecoMatchQuery({ isApp: !desktop, currency })

  return <MatchCarousel data={data} />
}
