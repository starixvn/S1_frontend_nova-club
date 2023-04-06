import { store } from 'app/provider/redux/store'
import { EndpointBuilderType } from 'services/common/types'
import { AgentNewTransferArgs, AgentNewTransferResult } from './agentApi.type'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AddNewShareholderArgs,
  AddNewShareholderResult,
  NewEarnPercentage,
  ShareholderChangeReferralArgs,
  ShareholderChangeReferralResult,
  ShareholderCreatePinArgs,
  ShareholderCreatePinResult,
  ShareholderDetailsArgs,
  ShareholderDetailsResult,
  ShareholderGetEarnPtArgs,
  ShareholderGetEarnPtResult,
  ShareholderListArgs,
  ShareholderListResult,
  ShareholderProfile,
  ShareholderRecentTransactionListArgs,
  ShareholderRecentTransactionListResult,
  ShareholderResetPinArgs,
  ShareholderUpdatePtArgs,
  ShareholderVerifyTransferPinArgs,
  ShareholderVerifyTransferPinResult,
} from './shareholderApi.type'

export const shareholderApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    shareholderList: builder.query<
      IResponse<ShareholderListResult[]> | undefined,
      ShareholderListArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/list`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache?.result?.data.push(...newItems.result.data)

          return currentCache
        }
        return newItems
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['ShareholderList'],
    }),
    newEarnPercentage: builder.query<IResponse<NewEarnPercentage>, void>({
      query: () => ({
        url: '/sh/earnPercNew',
      }),
    }),
    shareholderProfile: builder.query<IResponse<ShareholderProfile>, void>({
      query: () => ({
        url: `/sh/profile`,
      }),
    }),
    shareholderDetails: builder.query<
      IResponse<ShareholderDetailsResult>,
      ShareholderDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/detail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderResetPin: builder.mutation<
      IResponse<[]>,
      ShareholderResetPinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/resetPin`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    addNewShareholder: builder.mutation<
      IResponse<AddNewShareholderResult>,
      AddNewShareholderArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/new`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderNewTransfer: builder.mutation<
      IResponse<AgentNewTransferResult>,
      AgentNewTransferArgs
    >({
      query: ({ balance_transfer, currency, memberCode, remark }) => ({
        url: `/sh/transfer`,
        data: {
          balance_transfer,
          currency,
          memberCode,
          remark,
        },
      }),
      invalidatesTags: ['ShareholderTransferHistory', 'WalletAmount'],
    }),
    shareholderChangeReferralToUserDetail: builder.mutation<
      IResponse<ShareholderChangeReferralResult>,
      ShareholderChangeReferralArgs
    >({
      query: ({ referralCode }) => ({
        url: `/sh/transfer/change/referralCode`,
        data: {
          referralCode,
        },
      }),
    }),
    shareholderCreatePin: builder.mutation<
      IResponse<ShareholderCreatePinResult>,
      ShareholderCreatePinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/createPin`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['UserInfo'],
    }),
    shareholderVerifyTransferPin: builder.mutation<
      IResponse<ShareholderVerifyTransferPinResult>,
      ShareholderVerifyTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/verifyTransferPin`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderRecentTransactionList: builder.query<
      IResponse<ShareholderRecentTransactionListResult[]>,
      ShareholderRecentTransactionListArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/transferList`,
        data: {
          ...queryArgs,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache.result?.data.push(...newItems.result.data)

          return currentCache
        }

        return newItems
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['ShareholderTransferHistory'],
    }),
    shareholderGetEarnPt: builder.query<
      IResponse<ShareholderGetEarnPtResult>,
      ShareholderGetEarnPtArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/earnPercEdit`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderUpdatePt: builder.mutation<
      IResponse<void>,
      ShareholderUpdatePtArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/updatePt`,
        data: {
          ...queryArgs,
        },
      }),
      // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data: updatedPost } = await queryFulfilled
      //     console.log(
      //       '🚀 ~ file: shareholderApi.ts:204 ~ onQueryStarted ~ updatedPost:',
      //       updatedPost
      //     )
      //     if (updatedPost.success) {
      //       const ca = shareholderApi.endpoints.shareholderList.select()(
      //         store.getState()
      //       )
      //       console.log(
      //         '🚀 ~ file: shareholderApi.ts:203 ~ onQueryStarted ~ ca:',
      //         ca
      //       )
      //       const patchResult = dispatch(
      //         shareholderApi.util.updateQueryData(
      //           'shareholderList',
      //           undefined,
      //           (draft) => {
      //             console.log(
      //               '🚀 ~ file: shareholderApi.ts:207 ~ shareholderApi.util.updateQueryData ~ draft:',
      //               draft
      //             )
      //             const update = {
      //               id: 203,
      //               username: 'Agent015',
      //               earning_perc: '90',
      //               created_at: '2023-04-05T02:51:10Z',
      //               active: '1',
      //             }
      //             Object.assign(draft, update)
      //           }
      //         )
      //       )
      //       console.log(
      //         '🚀 ~ file: shareholderApi.ts:227 ~ onQueryStarted ~ patchResult:',
      //         patchResult
      //       )

      //       dispatch(
      //         shareholderApi.util.patchQueryData(
      //           'shareholderList',
      //           undefined,
      //           patchResult.patches
      //         )
      //       )
      //     }
      //   } catch {}
      // },
      // invalidatesTags: ['ShareholderList'],
    }),
  }),
})

export const {
  useShareholderListQuery,
  useNewEarnPercentageQuery,
  useLazyShareholderProfileQuery,
  useShareholderProfileQuery,
  useShareholderDetailsQuery,
  useShareholderResetPinMutation,
  useAddNewShareholderMutation,
  useShareholderChangeReferralToUserDetailMutation,
  useShareholderNewTransferMutation,
  useShareholderCreatePinMutation,
  useShareholderVerifyTransferPinMutation,
  useShareholderRecentTransactionListQuery,
  useShareholderGetEarnPtQuery,
  useShareholderUpdatePtMutation,
} = shareholderApi
