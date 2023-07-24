import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AgentCommissionListArgs,
  AgentCommissionListResult,
  ShareholderCommissionListArgs,
  ShareholderCommissionListResult,
  TransactionReportArgs,
  TransactionReportResult,
} from './reportApi.type'
import { ShareholderListResult } from './shareholderApi.type'

export const reportApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    transactionReport: builder.query<
      IResponse<TransactionReportResult[]> | undefined,
      TransactionReportArgs
    >({
      query: (queryArgs) => ({
        url: `/transaction/list`,
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
      providesTags: ['TransactionReport'],
    }),
    agentCommissionList: builder.query<
      IResponse<AgentCommissionListResult[]> | undefined,
      AgentCommissionListArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/commission`,
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
      providesTags: ['AgentCommission'],
    }),
    shareholderCommissionList: builder.query<
      IResponse<ShareholderCommissionListResult[]> | undefined,
      ShareholderCommissionListArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/commission`,
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
      providesTags: ['ShareholderCommission'],
    }),
  }),
})

export const {
  useTransactionReportQuery,
  useShareholderCommissionListQuery,
  useAgentCommissionListQuery,
} = reportApi
