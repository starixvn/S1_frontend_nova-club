import { baseApiWithTag } from './baseApi'
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

const depositApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    /**
     * *Deposit Payment List
     */
    depositPaymentList: builder.query<
      IResponse<DepositPaymentListResult>,
      DepositPaymentListArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/depositPaymentList`,
        method: 'POST',
        data: { ...queryArgs },
      }),
      providesTags: ['DepositPaymentList'],
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
      invalidatesTags: ['Balance', 'Report'],
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
      invalidatesTags: ['Balance', 'Report', 'DepositPaymentList'],
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
      invalidatesTags: ['Report'],
    }),
  }),
})

export const {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} = depositApi
