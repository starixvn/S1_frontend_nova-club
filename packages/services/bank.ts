import { createApi } from '@reduxjs/toolkit/query/react'
import {
  addPlayerBankAccArgs,
  addPlayerBankAccResult,
  DeletePlayerBankAccArgs,
  DeletePlayerBankAccResult,
  PlayerBankArgs,
  PlayerBankResult,
  WithdrawalBankArgs,
  WithdrawalBankResult,
} from './bank.type'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'

const bankEndpoints = (builder: EndpointBuilderType) => {
  return {
    /**
     * *Player Bank Get, Add, Delete
     */
    playerBank: builder.query<
      IResponse<PlayerBankResult[]>,
      PlayerBankArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerWithdrawalBankList`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      providesTags: ['playerBank'],
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
      invalidatesTags: ['playerBank'],
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
      invalidatesTags: ['playerBank'],
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
  }
}

const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['playerBank'],
  endpoints: (builder) => ({
    ...bankEndpoints(builder),
  }),
})

export default bankApi
export { bankEndpoints }
export const {
  usePlayerBankQuery,
  useWithdrawalBankQuery,
  useAddPlayerBankAccMutation,
  useDeletePlayerBankAccMutation,
} = bankApi
