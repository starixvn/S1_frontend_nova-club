import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const withdrawalApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    submitWithdrawal: builder.mutation<
      IResponse<string>,
      SubmitWithdrawalArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/submitWithdrawal`,
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
  }),
})

export const { useSubmitWithdrawalMutation } = withdrawalApi
