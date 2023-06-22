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
        url: `/player_api/getPlayerWithdrawalBankList`,
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
        url: `/player_api/addWithdrawalBankAcc`,
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
        url: `/player_api/deleteWithdrawalBank`,
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
      IResponse<WithdrawalBankResult[]>,
      WithdrawalBankArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    cryptoBank: builder.query<
      IResponse<CryptoWithdrawalBankResult[]>,
      CryptoWithdrawalBankArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getCryptoWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
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
