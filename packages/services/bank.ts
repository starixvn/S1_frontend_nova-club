import {
  FLAG_PAYMENT_TYPE_BANK,
  FLAG_PAYMENT_TYPE_CRYPTO,
} from 'app/constants/crypto'
import {
  addPlayerBankAccArgs,
  addPlayerBankAccResult,
  CryptoWithdrawalBankArgs,
  CryptoWithdrawalBankResult,
  DeletePlayerBankAccArgs,
  DeletePlayerBankAccResult,
  PlayerBankArgs,
  PlayerBankResult,
  WithdrawalBankArgs,
  WithdrawalBankResult,
} from './bank.type'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'

const bankApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    /**
     * *Player Bank Get, Add, Delete
     */
    playerBank: builder.query<PlayerBankResult[], PlayerBankArgs | void>({
      query: (queryArgs) => ({
        url: `/player_api/v1/getPlayerWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: ({ data }: { data: PlayerBankResult[] }) => {
        return data ?? []
      },
      providesTags: ['PlayerBank'],
    }),
    addPlayerBankAcc: builder.mutation<
      IResponse<addPlayerBankAccResult>,
      addPlayerBankAccArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/addWithdrawalBankAcc`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['PlayerBank'],
    }),
    deletePlayerBankAcc: builder.mutation<
      IResponse<DeletePlayerBankAccResult>,
      DeletePlayerBankAccArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/deleteWithdrawalBank`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['PlayerBank'],
    }),

    /**
     * *General Withdrawal Bank
     */
    withdrawalBank: builder.query<
      WithdrawalBankResult[],
      WithdrawalBankArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: ({ data }: { data: WithdrawalBankResult[] }) => {
        return data ?? []
      },
    }),
    cryptoBank: builder.query<
      CryptoWithdrawalBankResult[],
      CryptoWithdrawalBankArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getCryptoWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: ({ data }: { data: CryptoWithdrawalBankResult[] }) => {
        return data ?? []
      },
    }),
  }),
})

type PlayerProfileQuerySubscriptionOptions = Parameters<
  typeof bankApi.usePlayerBankQuery
>[1]

export const usePlayerBankQuery = (
  _: void,
  options?: PlayerProfileQuerySubscriptionOptions
) => {
  return bankApi.usePlayerBankQuery(undefined, {
    ...options,
    selectFromResult: (res) => {
      return {
        ...res,
        playerBankList: res?.data?.filter(
          (b) => b.PaymentTypeFlag === FLAG_PAYMENT_TYPE_BANK
        ),
        playerCryptoList: res?.data?.filter(
          (b) => b.PaymentTypeFlag === FLAG_PAYMENT_TYPE_CRYPTO
        ),
      }
    },
  })
}

export const {
  useWithdrawalBankQuery,
  useCryptoBankQuery,
  useAddPlayerBankAccMutation,
  useDeletePlayerBankAccMutation,
} = bankApi
