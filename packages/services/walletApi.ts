import { baseApiWithTag } from './baseApi'
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

export const walletApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
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
  }),
})

export const {
  usePlayerBalanceQuery,
  useLazyPlayerBalanceQuery,
  usePlayerWalletDetailQuery,
  useTransferMutation,
  useTransferAllToOneMutation,
  useTransferMemberToMemberMutation,
} = walletApi
