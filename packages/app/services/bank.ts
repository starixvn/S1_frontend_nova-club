import { createApi } from '@reduxjs/toolkit/query/react'
import {
  addWithdrawalBankAccArgs,
  addWithdrawalBankAccResult,
  deleteWithdrawalBankAccArgs,
  deleteWithdrawalBankAccResult,
  PlayerWithdrawalBankArgs,
  PlayerWithdrawalBankResult,
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
    playerWithdrawalBank: builder.query<
      IResponse<PlayerWithdrawalBankResult[]>,
      PlayerWithdrawalBankArgs
    >({
      query: ({ username }) => ({
        url: `/player_api/getPlayerWithdrawalBankList`,
        method: 'POST',
        data: {
          username,
        },
      }),
      transformResponse: (
        res: IResponse<PlayerWithdrawalBankResult[]>
      ): PlayerWithdrawalBankResult[] => {
        return res.data ?? []
      },
      providesTags: ['playerBank'],
    }),
    addWithdrawalBankAcc: builder.mutation<
      IResponse<addWithdrawalBankAccResult>,
      addWithdrawalBankAccArgs
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
    deleteWithdrawalBank: builder.mutation<
      IResponse<deleteWithdrawalBankAccResult>,
      deleteWithdrawalBankAccArgs
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
      WithdrawalBankArgs
    >({
      query: ({ username }) => ({
        url: `/player_api/getWithdrawalBankList`,
        method: 'POST',
        data: {
          username,
        },
      }),
      transformResponse: (
        res: IResponse<WithdrawalBankResult[]>
      ): WithdrawalBankResult[] => {
        return res.data ?? []
      },
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
  usePlayerWithdrawalBankQuery,
  useWithdrawalBankQuery,
  useAddWithdrawalBankAccMutation,
  useDeleteWithdrawalBankMutation,
} = bankApi
