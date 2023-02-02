import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  NettPayout,
  NettPayoutArgs,
  WithdrawalItem,
  WithdrawalListArgs,
  WithdrawalSubmissionInfo,
  WithdrawalSubmitFormArgs,
} from './withdrawalApi.type'

export const withdrawalApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    withdrawalList: builder.query<
      IResponse<WithdrawalItem[]>,
      WithdrawalListArgs
    >({
      query: (queryArgs) => ({
        url: '/withdrawal/list',
        data: {
          ...queryArgs,
        },
      }),
      providesTags: ['WithdrawalHistory'],
    }),
    newWithdrawal: builder.mutation<
      IResponse<WithdrawalSubmissionInfo>,
      WithdrawalSubmitFormArgs
    >({
      query: (queryArgs) => ({
        url: `/withdrawal/new`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['WalletAmount', 'WithdrawalHistory'],
    }),
    newNettPayout: builder.mutation<IResponse<NettPayout>, NettPayoutArgs>({
      query: (queryArgs) => ({
        url: '/withdrawal/new/lookup/nettpayout',
        data: {
          ...queryArgs,
        },
      }),
    }),
  }),
})

export const {
  useWithdrawalListQuery,
  useNewWithdrawalMutation,
  useNewNettPayoutMutation,
} = withdrawalApi
