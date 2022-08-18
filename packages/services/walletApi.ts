import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  PlayerBalanceArgs,
  PlayerBalanceResult,
  PlayerWalletDetailArgs,
  PlayerWalletDetailResult,
  TransferAllToOneArgs,
  TransferAllToOneResult,
  TransferArgs,
  TransferMemberToMemberArgs,
  TransferMemberToMemberResult,
  TransferResult,
} from './wallet.type'

const walletEndPoints = (builder: EndpointBuilderType) => {
  return {
    playerBalance: builder.query<
      IResponse<PlayerBalanceResult>,
      PlayerBalanceArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerBalance`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      providesTags: ['Balance'],
    }),
    playerWalletDetail: builder.query<
      IResponse<PlayerWalletDetailResult>,
      PlayerWalletDetailArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerWalletDetail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    transfer: builder.mutation<IResponse<TransferResult>, TransferArgs>({
      query: (queryArgs) => ({
        url: `/player_api/transfer`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Balance'],
    }),
    transferAllToOne: builder.mutation<
      IResponse<TransferAllToOneResult>,
      TransferAllToOneArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/transferAllToOne`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Balance'],
    }),
    transferMemberToMember: builder.mutation<
      IResponse<TransferMemberToMemberResult>,
      TransferMemberToMemberArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/memberToMemberTransfer`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Balance'],
    }),
  }
}

const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Balance'],
  endpoints: (builder) => ({
    ...walletEndPoints(builder),
  }),
})

export default walletApi
export { walletEndPoints }
export const {
  usePlayerBalanceQuery,
  useLazyPlayerBalanceQuery,
  usePlayerWalletDetailQuery,
  useTransferMutation,
  useTransferAllToOneMutation,
  useTransferMemberToMemberMutation,
} = walletApi
