import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  GetUsernameByCodeArgs,
  GetUsernameByCodeResult,
  PlayerBalance,
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
    playerBalance: builder.query<PlayerBalance, void>({
      query: () => ({
        url: `/player_api/v1/getPlayerBalance`,
        method: 'POST',
      }),
      providesTags: ['Balance'],
      transformResponse: (resp: IResponse<PlayerBalanceResult>) => {
        if (resp.data) {
          return {
            ...resp.data,
            totalBalance: Object.values(resp.data).reduce(
              (total, w) => total + (Number(w.balance) ?? 0),
              0
            ),
            totalReward: Number(resp.data.main?.reward ?? 0),
          } as PlayerBalance
        } else {
          return {
            totalBalance: 0,
            totalReward: 0,
          } as PlayerBalance
        }
      },
    }),
    playerWalletDetail: builder.query<
      IResponse<PlayerWalletDetailResult>,
      PlayerWalletDetailArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getPlayerWalletDetail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    transfer: builder.mutation<IResponse<TransferResult>, TransferArgs>({
      query: (queryArgs) => ({
        url: `/player_api/v1/transfer`,
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
        url: `/player_api/v1/transferAllToOne`,
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
        url: `/player_api/v1/memberToMemberTransfer`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          // delay api fetching, cannot fetch with balance api at the same time
          setTimeout(() => {
            dispatch(
              dispatch(walletApi.util.invalidateTags(['AvailableAmount']))
            )
          }, 1000)
        } catch (err) {
          // `onError` side-effect
        }
      },
      invalidatesTags: ['Balance'],
    }),
    getUsernameByCode: builder.query<
      IResponse<GetUsernameByCodeResult>,
      GetUsernameByCodeArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getUsernameByCode`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
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
  useLazyGetUsernameByCodeQuery,
} = walletApi
