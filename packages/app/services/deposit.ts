import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  SubmitDepositArgs,
  SubmitDepositResult,
  SubmitManualDepositArgs,
  SubmitManualDepositResult,
} from './deposit.type'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const DepositEndPoints = (builder: EndpointBuilderType) => {
  return {
    submitDeposit: builder.mutation<
      IResponse<SubmitDepositResult>,
      SubmitDepositArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/submitDeposit`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    submitManualDeposit: builder.mutation<
      IResponse<SubmitManualDepositResult>,
      SubmitManualDepositArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/submitManualDeposit`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
  }
}

const depositApi = createApi({
  reducerPath: 'depositApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...DepositEndPoints(builder),
  }),
})

export default depositApi
export { DepositEndPoints }
export const { useSubmitDepositMutation } = depositApi
