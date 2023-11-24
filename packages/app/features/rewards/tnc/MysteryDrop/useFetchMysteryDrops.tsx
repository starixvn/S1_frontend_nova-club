import { useRandomInterval } from 'app/hooks/useRandomInterval'
import React from 'react'
import { useGetMysteryEventQuery } from 'services/eventApi'
import { MysteryEventPrize } from 'services/eventApi.type'

const useFetchMysteryDrops = () => {
  const { data, refetch } = useGetMysteryEventQuery()
  const delay = [5000, 10000]

  useRandomInterval(() => refetch(), ...delay)

  const defaultPrize: MysteryEventPrize = { amt: '0', min: '0', max: '0' }
  const miniPrize = (data && data[1]) ?? defaultPrize
  const majorPrize = (data && data[2]) ?? defaultPrize
  const grandPrize = (data && data[3]) ?? defaultPrize
  const _jackpot = data
    ? Number(miniPrize.amt) + Number(majorPrize.amt) + Number(grandPrize.amt)
    : 0
  const jackpot = Number(_jackpot.toFixed(2))

  return {
    miniPrize,
    majorPrize,
    grandPrize,
    jackpot,
  }
}

export default useFetchMysteryDrops
