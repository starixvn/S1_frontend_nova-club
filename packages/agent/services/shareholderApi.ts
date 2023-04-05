import { EndpointBuilderType } from 'services/common/types'
import { AgentNewTransferResult, AgentNewTransferArgs } from './agentApi.type'
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
  ShareholderListArgs,
  ShareholderListResult,
  ShareholderProfile,
  ShareholderRecentTransactionListArgs,
  ShareholderRecentTransactionListResult,
  ShareholderResetPinArgs,
  ShareholderTransferListArgs,
  ShareholderTransferListItemResult,
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
} = shareholderApi
