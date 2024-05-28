import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AvailableWithdrawalAmountResult,
  CryptoExchangeRateArgs,
  CryptoExchangeRateResult,
  SubmitWithdrawalArgs,
} from './withdrawal.type'

const withdrawalApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    submitWithdrawal: builder.mutation<
      IResponse<string>,
      SubmitWithdrawalArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/submitWithdrawal`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Balance', 'Report', 'AvailableAmount'],
    }),
    cryptoExchangeRate: builder.query<
      IResponse<CryptoExchangeRateResult>,
      CryptoExchangeRateArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getCryptoExchangeRate`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    getAvailableWithdrawalAmount: builder.query<
      AvailableWithdrawalAmountResult,
      void
    >({
      query: () => ({
        url: `/player_api/v1/getAvailWithdrawAmount`,
        method: 'POST',
      }),
      transformResponse: ({
        data,
      }: {
        data: AvailableWithdrawalAmountResult
      }) => {
        return data
      },
      providesTags: ['AvailableAmount'],
    }),
  }),
})

export const {
  useSubmitWithdrawalMutation,
  useLazyCryptoExchangeRateQuery,
  useGetAvailableWithdrawalAmountQuery,
} = withdrawalApi
