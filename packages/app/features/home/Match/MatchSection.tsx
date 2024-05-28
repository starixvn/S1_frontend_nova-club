import MatchCarousel from 'app/components/match/MatchCarousel'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import React, { useMemo } from 'react'
import { useGetRecoMatchQuery } from 'services/matchApi'

type Props = {}

export default function MatchSection({}: Props) {
  const desktop = useIsDesktop()
  const { data } = useGetRecoMatchQuery({ isApp: !desktop })

  const filteredData = useMemo(() => {
    const euroLeagueIndex = data?.findIndex(
      (el) => el.LeagueId === MatchLeagueId.EURO_CUP
    )

    const finalData = data?.slice(0, euroLeagueIndex)

    return finalData ?? []
  }, [data])

  return <MatchCarousel data={filteredData} />
}
