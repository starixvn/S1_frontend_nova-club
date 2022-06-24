import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  DepositPaymentListArgs,
  DepositPaymentListResult,
  SubmitDepositArgs,
  SubmitDepositResult,
  SubmitManualDepositArgs,
  SubmitManualDepositResult,
} from './deposit.type'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const DepositEndPoints = (builder: EndpointBuilderType) => {
  return {
    /**
     * *Deposit Payment List
     */
    depositPaymentList: builder.query<
      IResponse<DepositPaymentListResult[]>,
      DepositPaymentListArgs
    >({
      query: ({ username }) => ({
        url: `/player_api/depositPaymentList`,
        method: 'POST',
        data: {
          username,
        },
      }),
    }),

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
export const { useSubmitDepositMutation, useSubmitManualDepositMutation } =
  depositApi
