import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { WithdrawalBankArgs, WithdrawalBankResult } from './withdrawalBank.type'

const withdrawalBankEndpoints = (builder: EndpointBuilderType) => {
  return {
    withdrawalBank: builder.query<
      IResponse<WithdrawalBankResult[]>,
      WithdrawalBankArgs
    >({
      query: ({ username }) => ({
        url: `/player_api/getWithdrawalBankList`,
        method: 'POST',
        data: {
          username,
        },
      }),
      transformResponse: (
        res: IResponse<WithdrawalBankResult[]>
      ): WithdrawalBankResult[] => {
        return res.data ?? []
      },
    }),
  }
}

const withdrawalBankApi = createApi({
  reducerPath: 'withdrawalBankApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...withdrawalBankEndpoints(builder),
  }),
})

export default withdrawalBankApi
export { withdrawalBankEndpoints }
export const { useWithdrawalBankQuery } = withdrawalBankApi
