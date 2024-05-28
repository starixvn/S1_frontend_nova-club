import dayjs from 'dayjs'
import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  NewTransferArgs,
  NewTransferResult,
  ProfileChangeReferralArgs,
  ProfileChangeReferralResult,
  TransferListArgs,
  TransferListItemResult,
} from './transferApi.type'

export const transferApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    transferList: builder.query<
      IResponse<TransferListItemResult[]>,
      TransferListArgs
    >({
      query: ({ length, date_from, currency, start }) => ({
        url: `/profile/transferList`,
        data: {
          start,
          length,
          currency,
          date_from,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache.result?.data.push(...newItems.result.data)

          return currentCache
        }

        return newItems
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['TransferHistory'],
    }),

    profileChangeReferralToUserDetail: builder.mutation<
      IResponse<ProfileChangeReferralResult>,
      ProfileChangeReferralArgs
    >({
      query: ({ referralCode }) => ({
        url: `/profile/transfer/change/referralCode`,
        data: {
          referralCode,
        },
      }),
    }),

    profileNewTransfer: builder.mutation<
      IResponse<NewTransferResult>,
      NewTransferArgs
    >({
      query: ({ balance_transfer, currency, memberCode, remark }) => ({
        url: `/profile/transfer`,
        data: {
          balance_transfer,
          currency,
          memberCode,
          remark,
        },
      }),
      async onQueryStarted(
        { balance_transfer, currency, referrer_code },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } = transferApi.endpoints.transferList.select()(
          getState()
        )

        const newItem = {
          amount: balance_transfer,
          currency,
          created_date: dayjs().toISOString(),
          referrer_code: referrer_code ?? '',
        }

        await queryFulfilled
        dispatch(
          transferApi.util.updateQueryData(
            'transferList',
            originalArgs,
            (draft) => {
              draft.result?.data.unshift(newItem)
            }
          )
        )
      },
      invalidatesTags: ['WalletAmount'],
    }),
  }),
})

export const {
  useTransferListQuery,
  useProfileNewTransferMutation,
  useProfileChangeReferralToUserDetailMutation,
} = transferApi
