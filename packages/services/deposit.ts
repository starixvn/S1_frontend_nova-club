import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          // dispatch(dispatch(playerApi.util.invalidateTags(['Report'])))
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
  }),
})

export const {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} = depositApi
