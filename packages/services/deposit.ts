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
  UploadDepositSlipArgs,
} from './deposit.type'
import playerApi from './playerApi'
import walletApi from './walletApi'
import { SubmitWithdrawalArgs } from './withdrawal.type'

const DepositEndPoints = (builder: EndpointBuilderType) => {
  return {
    /**
     * *Deposit Payment List
     */
    depositPaymentList: builder.query<
      IResponse<DepositPaymentListResult>,
      void
    >({
      query: () => ({
        url: `/player_api/depositPaymentList`,
        method: 'POST',
        data: {},
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
    uploadDepositSlip: builder.mutation<
      IResponse<string>,
      UploadDepositSlipArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/uploadPlayerDepositSlip`,
        method: 'POST',
        headers: { post: { 'Content-Type': 'multipart/form-data' } },
        data: queryArgs,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(dispatch(playerApi.util.invalidateTags(['Report'])))
        } catch (err) {
          // `onError` side-effect
        }
      },
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
export const {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} = depositApi
