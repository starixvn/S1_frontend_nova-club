import MatchCarousel from 'app/components/match/MatchCarousel'
import useIsDesktop from 'app/hooks/useIsDesktop'
import React from 'react'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const desktop = useIsDesktop()
  const { data } = useGetRecoMatchQuery({ isApp: !desktop })

  return <MatchCarousel data={data} />
}
