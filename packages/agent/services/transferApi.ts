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
    }),
  }),
})

export const { useTransferListQuery } = transferApi
