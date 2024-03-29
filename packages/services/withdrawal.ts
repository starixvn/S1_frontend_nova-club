import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  Avail,
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
      invalidatesTags: ['Balance', 'Report'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          // dispatch(dispatch(walletApi.util.invalidateTags(['Balance'])))
          // dispatch(dispatch(playerApi.util.invalidateTags(['Report'])))
        } catch (err) {
          // `onError` side-effect
        }
      },
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
        data: {},
      }),
      transformResponse: ({
        data,
      }: {
        data: AvailableWithdrawalAmountResult
      }) => {
        return { balance: data?.balance }
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
