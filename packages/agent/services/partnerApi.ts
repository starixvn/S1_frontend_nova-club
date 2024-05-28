import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AddNewPartnerArgs,
  AddNewPartnerResult,
  PartnerBalanceArgs,
  PartnerBalanceResult,
  PartnerDetailsArgs,
  PartnerDetailsResult,
  PartnerListArgs,
  PartnerListResult,
} from './partnerApi.type'
import { ShareholderSetStatusArgs } from './shareholderApi.type'

export const partnerApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    partnerBalance: builder.query<
      IResponse<PartnerBalanceResult>,
      PartnerBalanceArgs
    >({
      query: (queryArgs) => ({
        url: `/profile/balance`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    partnerDetails: builder.query<
      IResponse<PartnerDetailsResult>,
      PartnerDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/partner/detail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    addNewPartner: builder.mutation<
      IResponse<AddNewPartnerResult>,
      AddNewPartnerArgs
    >({
      query: (queryArgs) => ({
        url: `/partner/new`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    partnerList: builder.query<IResponse<PartnerListResult[]>, PartnerListArgs>(
      {
        query: (queryArgs) => ({
          url: `/partner/list`,
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
        providesTags: ['Partnerlist'],
      }
    ),

    partnerSetStatus: builder.mutation<
      IResponse<void>,
      ShareholderSetStatusArgs
    >({
      query: (queryArgs) => ({
        url: `/partner/setStatus`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { shareholder_id, status },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } = partnerApi.endpoints.partnerList.select()(
          getState()
        )

        await queryFulfilled
        dispatch(
          partnerApi.util.updateQueryData(
            'partnerList',
            originalArgs,
            (draft) => {
              let selected = draft?.result?.data.find(
                (el) => el.id === shareholder_id
              )
              console.log('🚀 ~ selected:', selected)
              if (selected) selected.active = status
            }
          )
        )
      },
    }),
  }),
})

export const {
  usePartnerDetailsQuery,
  useAddNewPartnerMutation,
  usePartnerListQuery,
  usePartnerBalanceQuery,
  usePartnerSetStatusMutation,
} = partnerApi
// /app_api/account/sendOtp
