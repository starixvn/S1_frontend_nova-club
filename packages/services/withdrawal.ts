import { API_DOMAIN } from '@env'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import playerApi from './playerApi'
import walletApi from './walletApi'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const withdrawalEndPoints = (builder: EndpointBuilderType) => {
  return {
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(dispatch(walletApi.util.invalidateTags(['Balance'])))
          dispatch(dispatch(playerApi.util.invalidateTags(['Report'])))
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
  }
}

const withdrawalApi = createApi({
  reducerPath: 'withdrawalApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...withdrawalEndPoints(builder),
  }),
})

export default withdrawalApi
export { withdrawalEndPoints }
export const { useSubmitWithdrawalMutation } = withdrawalApi
