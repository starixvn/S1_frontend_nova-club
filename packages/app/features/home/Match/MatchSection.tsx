import MatchCarousel from 'app/components/match/MatchCarousel'
import React from 'react'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const { data } = useGetRecoMatchQuery()

  return <MatchCarousel data={data} />
}
