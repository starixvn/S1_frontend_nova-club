import MatchCarousel from 'app/components/match/MatchCarousel'
import isDesktop from 'app/utils/isDesktop'
import React from 'react'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const desktop = isDesktop()
  const { data } = useGetRecoMatchQuery({ isApp: !desktop })

  return <MatchCarousel data={data} />
}
