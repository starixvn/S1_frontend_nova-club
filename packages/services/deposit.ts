import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AvailableDepositAmountResult,
  DepositPaymentListArgs,
  DepositPaymentListResult,
  SubmitDepositArgs,
  SubmitDepositResult,
  SubmitManualDepositArgs,
  SubmitManualDepositResult,
  UploadDepositSlipArgs,
} from './deposit.type'
import { AvailableWithdrawalAmountResult } from './withdrawal.type'

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
        url: `/player_api/v1/depositPaymentList`,
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
        url: `/player_api/v1/submitDeposit`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Balance', 'Report', 'AvailableDepositAmount'],
    }),
    submitManualDeposit: builder.mutation<
      IResponse<SubmitManualDepositResult>,
      SubmitManualDepositArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/submitManualDeposit`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: [
        'Balance',
        'Report',
        'DepositPaymentList',
        'AvailableDepositAmount',
      ],
    }),
    uploadDepositSlip: builder.mutation<
      IResponse<string>,
      UploadDepositSlipArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/uploadPlayerDepositSlip`,
        method: 'POST',
        headers: { post: { 'Content-Type': 'multipart/form-data' } },
        data: queryArgs,
      }),
      invalidatesTags: ['Report'],
    }),
    getAvailableDepositAmount: builder.query<
      AvailableDepositAmountResult,
      void
    >({
      query: () => ({
        url: `/player_api/v1/getAvailDepositAmount`,
        method: 'POST',
        keepUnusedDataFor: 5,
      }),
      transformResponse: ({
        data,
      }: {
        data: AvailableWithdrawalAmountResult
      }) => {
        return data
      },
      providesTags: ['AvailableDepositAmount'],
    }),
  }),
})

export const {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
  useGetAvailableDepositAmountQuery,
} = depositApi
