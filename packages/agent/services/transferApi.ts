import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import { TransferListArgs, TransferListItemResult } from './transferApi.type'

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
  }),
})

export const { useTransferListQuery } = transferApi
