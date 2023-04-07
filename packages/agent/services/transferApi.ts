import dayjs from 'dayjs'
import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AgentChangeReferralArgs,
  AgentChangeReferralResult,
  AgentNewTransferArgs,
  AgentNewTransferResult,
  AgentTransferListArgs,
  AgentTransferListResult,
  ShareholderChangeReferralArgs,
  ShareholderChangeReferralResult,
  ShareholderNewTransferArgs,
  ShareholderNewTransferResult,
  ShareholderTransferListArgs,
  ShareholderTransferListResult,
  TransferListArgs,
  TransferListItemResult,
} from './transferApi.type'

export const transferApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    transferList: builder.query<
      IResponse<TransferListItemResult[]>,
      TransferListArgs
    >({
      query: ({ length, date_from, currency, start, role }) => ({
        url: `/${role}/transferList`,
        data: {
          start,
          length,
          currency,
          date_from,
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
      providesTags: ['TransferHistory'],
    }),

    //Agent Transfer
    agentTransferList: builder.query<
      IResponse<AgentTransferListResult[]>,
      AgentTransferListArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/transferList`,
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
      providesTags: ['AgentTransferHistory'],
    }),
    agentChangeReferralToUserDetail: builder.mutation<
      IResponse<AgentChangeReferralResult>,
      AgentChangeReferralArgs
    >({
      query: ({ referralCode }) => ({
        url: `/agent/transfer/change/referralCode`,
        data: {
          referralCode,
        },
      }),
    }),
    agentNewTransfer: builder.mutation<
      IResponse<AgentNewTransferResult>,
      AgentNewTransferArgs
    >({
      query: ({ balance_transfer, currency, memberCode, remark }) => ({
        url: `/agent/transfer`,
        data: {
          balance_transfer,
          currency,
          memberCode,
          remark,
        },
      }),
      async onQueryStarted(
        { balance_transfer, currency, referrer_code },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } =
          transferApi.endpoints.agentTransferList.select()(getState())

        const newItem = {
          amount: balance_transfer,
          currency,
          created_date: dayjs().toISOString(),
          referrer_code: referrer_code ?? '',
        }

        await queryFulfilled
        dispatch(
          transferApi.util.updateQueryData(
            'agentTransferList',
            originalArgs,
            (draft) => {
              draft.result?.data.unshift(newItem)
            }
          )
        )
      },
      invalidatesTags: ['WalletAmount'],
    }),

    // Shareholder Transfer
    shareholderTransferList: builder.query<
      IResponse<ShareholderTransferListResult[]>,
      ShareholderTransferListArgs
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
    shareholderNewTransfer: builder.mutation<
      IResponse<ShareholderNewTransferResult>,
      ShareholderNewTransferArgs
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
      async onQueryStarted(
        { balance_transfer, currency, referrer_code },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } =
          transferApi.endpoints.shareholderTransferList.select()(getState())

        const newItem = {
          amount: balance_transfer,
          currency,
          created_date: dayjs().toISOString(),
          referrer_code: referrer_code ?? '',
        }

        await queryFulfilled
        dispatch(
          transferApi.util.updateQueryData(
            'shareholderTransferList',
            originalArgs,
            (draft) => {
              draft.result?.data.unshift(newItem)
            }
          )
        )
      },
      invalidatesTags: ['WalletAmount'],
    }),
  }),
})

export const {
  useTransferListQuery,
  useAgentTransferListQuery,
  useAgentNewTransferMutation,
  useShareholderTransferListQuery,
  useShareholderNewTransferMutation,
  useAgentChangeReferralToUserDetailMutation,
  useShareholderChangeReferralToUserDetailMutation,
} = transferApi
