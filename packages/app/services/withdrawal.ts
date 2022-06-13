import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const withdrawalEndPoints = (builder: EndpointBuilderType) => {
  return {
    submitWithdrawal: builder.mutation<IResponse<string>, SubmitWithdrawalArgs>(
      {
        query: (queryArgs) => ({
          url: `/player_api/submitWithdrawal`,
          method: 'POST',
          data: {
            ...queryArgs,
          },
        }),
      }
    ),
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
