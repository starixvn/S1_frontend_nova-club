import dayjs from 'dayjs'
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
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache?.result?.data.push(...newItems.result.data)

          return currentCache
        }
        return newItems
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
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
      async onQueryStarted({ amount }, { dispatch, queryFulfilled, getState }) {
        const { originalArgs } =
          withdrawalApi.endpoints.withdrawalList.select()(getState())

        const newItem = {
          amount: Number(amount),
          status: '0',
          created_at: dayjs().toISOString(),
        }

        await queryFulfilled
        dispatch(
          withdrawalApi.util.updateQueryData(
            'withdrawalList',
            originalArgs,
            (draft) => {
              draft.result?.data.unshift(newItem)
            }
          )
        )
      },
      invalidatesTags: ['WalletAmount'],
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
