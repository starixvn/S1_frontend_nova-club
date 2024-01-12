import { useGetMysteryEventQuery } from 'services/eventApi'
import { MysteryEventPrize } from 'services/eventApi.type'

const useFetchMysteryDrops = () => {
  const { data } = useGetMysteryEventQuery(undefined, { pollingInterval: 5000 })

  const defaultPrize: MysteryEventPrize = { amt: '0', min: '0', max: '0' }
  const miniPrize = (data && data[1]) ?? defaultPrize
  const majorPrize = (data && data[2]) ?? defaultPrize
  const grandPrize = (data && data[3]) ?? defaultPrize
  const jackpot = data
    ? Number(miniPrize.amt) + Number(majorPrize.amt) + Number(grandPrize.amt)
    : undefined

  return {
    miniPrize,
    majorPrize,
    grandPrize,
    jackpot,
  }
}

export default useFetchMysteryDrops
