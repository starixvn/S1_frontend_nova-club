import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  EligibleEuroCupTicketArgs,
  EligibleEuroCupTicketResult,
  EuroCupEvent,
  EventEuroCupLogServiceResult,
  SubmitEuroCupTicketArgs,
  SubmitEuroCupTicketResult,
} from './euroApi.type'

export const euroApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    getEuroCupEvent: builder.query<EuroCupEvent, void>({
      query: () => ({
        url: `/static_api/getEuroCupEvent`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: EuroCupEvent }) => {
        return data ?? []
      },
    }),
    getEligibleEuroCupTicket: builder.query<
      IResponse<EligibleEuroCupTicketResult>,
      EligibleEuroCupTicketArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getEligibleEurocupTicket`,
        method: 'POST',
        data: queryArgs,
      }),
    }),
    submitEuroCupTicket: builder.mutation<
      IResponse<SubmitEuroCupTicketResult>,
      SubmitEuroCupTicketArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/submitEligibleEurocupTicket`,
        method: 'POST',
        data: queryArgs,
      }),
    }),
    getEventEuroCupLogService: builder.query<
      IResponse<EventEuroCupLogServiceResult>,
      void
    >({
      query: () => ({
        url: `/player_api/getEventEuroCupLogService`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetEuroCupEventQuery,
  useGetEligibleEuroCupTicketQuery,
  useLazyGetEligibleEuroCupTicketQuery,
  useSubmitEuroCupTicketMutation,
  useGetEventEuroCupLogServiceQuery,
} = euroApi
