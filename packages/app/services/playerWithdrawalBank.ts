import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  PlayerWithdrawalBankArgs,
  PlayerWithdrawalBankResult,
} from './playerWithdrawalBank.type'

const playerWithdrawalBankEndpoints = (builder: EndpointBuilderType) => {
  return {
    playerWithdrawalBank: builder.query<
      IResponse<PlayerWithdrawalBankResult[]>,
      PlayerWithdrawalBankArgs
    >({
      query: ({ username }) => ({
        url: `/player_api/getPlayerWithdrawalBankList`,
        method: 'POST',
        data: {
          username,
        },
      }),
      transformResponse: (
        res: IResponse<PlayerWithdrawalBankResult[]>
      ): PlayerWithdrawalBankResult[] => {
        return res.data ?? []
      },
    }),
  }
}

const playerWithdrawalBankApi = createApi({
  reducerPath: 'playerWithdrawalBankApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...playerWithdrawalBankEndpoints(builder),
  }),
})

export default playerWithdrawalBankApi
export { playerWithdrawalBankEndpoints }
export const { usePlayerWithdrawalBankQuery } = playerWithdrawalBankApi
