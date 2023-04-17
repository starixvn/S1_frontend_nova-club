import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AddNewShareholderArgs,
  AddNewShareholderResult,
  NewEarnPercentage,
  ShareholderBalanceArgs,
  ShareholderBalanceResult,
  ShareholderCreatePinArgs,
  ShareholderCreatePinResult,
  ShareholderDetailsArgs,
  ShareholderDetailsResult,
  ShareholderGetEarnPtArgs,
  ShareholderGetEarnPtResult,
  ShareholderListArgs,
  ShareholderListResult,
  ShareholderProfile,
  ShareholderResetPinArgs,
  ShareholderSetStatusArgs,
  ShareholderUpdatePtArgs,
  ShareholderVerifyTransferPinArgs,
  ShareholderVerifyTransferPinResult,
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
    newEarnPercentage: builder.query<IResponse<NewEarnPercentage>, void>({
      query: () => ({
        url: '/sh/earnPercNew',
      }),
    }),
    shareholderProfile: builder.query<IResponse<ShareholderProfile>, void>({
      query: () => ({
        url: `/sh/profile`,
      }),
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
    shareholderResetPin: builder.mutation<
      IResponse<[]>,
      ShareholderResetPinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/resetPin`,
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
    shareholderCreatePin: builder.mutation<
      IResponse<ShareholderCreatePinResult>,
      ShareholderCreatePinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/createPin`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['UserInfo'],
    }),
    shareholderVerifyTransferPin: builder.mutation<
      IResponse<ShareholderVerifyTransferPinResult>,
      ShareholderVerifyTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/verifyTransferPin`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderGetEarnPt: builder.query<
      IResponse<ShareholderGetEarnPtResult>,
      ShareholderGetEarnPtArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/earnPercEdit`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    shareholderUpdatePt: builder.mutation<
      IResponse<void>,
      ShareholderUpdatePtArgs
    >({
      query: (queryArgs) => ({
        url: `/sh/updatePt`,
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { id, currency },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } =
          shareholderApi.endpoints.shareholderList.select()(getState())

        const patchResult = dispatch(
          shareholderApi.util.updateQueryData(
            'shareholderList',
            originalArgs,
            (draft) => {
              let selected = draft?.result?.data.find((el) => el.id === id)
              if (selected) selected.earning_perc = currency.VND.EARNP
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      // invalidatesTags: ['ShareholderList'],
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
  useNewEarnPercentageQuery,
  useLazyShareholderProfileQuery,
  useShareholderProfileQuery,
  useShareholderDetailsQuery,
  useShareholderResetPinMutation,
  useAddNewShareholderMutation,
  useShareholderCreatePinMutation,
  useShareholderVerifyTransferPinMutation,
  useShareholderGetEarnPtQuery,
  useShareholderUpdatePtMutation,
  useShareholderSetStatusMutation,
  useShareholderBalanceQuery,
} = shareholderApi
