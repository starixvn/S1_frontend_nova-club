import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AddNewShareholderArgs,
  AddNewShareholderResult,
  ShareholderBalanceArgs,
  ShareholderBalanceResult,
  ShareholderDetailsArgs,
  ShareholderDetailsResult,
  ShareholderListArgs,
  ShareholderListResult,
  ShareholderSetStatusArgs,
} from './shareholderApi.type'

export const shareholderApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    shareholderList: builder.query<
      IResponse<ShareholderListResult[]> | undefined,
      ShareholderListArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/list`,
        method: 'POST',
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
      providesTags: ['ShareholderList'],
    }),
    shareholderDetails: builder.query<
      IResponse<ShareholderDetailsResult>,
      ShareholderDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/detail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderBalance: builder.query<
      IResponse<ShareholderBalanceResult>,
      ShareholderBalanceArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/balance`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    addNewShareholder: builder.mutation<
      IResponse<AddNewShareholderResult>,
      AddNewShareholderArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/new`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderSetStatus: builder.mutation<
      IResponse<void>,
      ShareholderSetStatusArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/setStatus`,
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { shareholder_id, status },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } =
          shareholderApi.endpoints.shareholderList.select()(getState())

        await queryFulfilled
        dispatch(
          shareholderApi.util.updateQueryData(
            'shareholderList',
            originalArgs,
            (draft) => {
              let selected = draft?.result?.data.find(
                (el) => el.id === shareholder_id
              )
              if (selected) selected.active = status
            }
          )
        )
      },
    }),
  }),
})

export const {
  useShareholderListQuery,
  useShareholderDetailsQuery,
  useAddNewShareholderMutation,
  useShareholderSetStatusMutation,
  useShareholderBalanceQuery,
} = shareholderApi
