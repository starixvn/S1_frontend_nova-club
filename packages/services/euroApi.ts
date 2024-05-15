import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  EligibleEuroCupTicketArgs,
  EligibleEuroCupTicketResult,
  EuroCupEvent,
  EventEuroCupLogServiceResult,
  GetSubmittedTeamArgs,
  GetSubmittedTeamResult,
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
      providesTags: ['EuroCupTicket'],
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
      invalidatesTags: ['EuroCupTicket', 'EuroCupSubmittedTeam'],
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
    getSubmittedTeam: builder.query<
      IResponse<GetSubmittedTeamResult>,
      GetSubmittedTeamArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getSubmittedTeam`,
        method: 'POST',
        data: queryArgs,
      }),
      providesTags: ['EuroCupSubmittedTeam'],
    }),
  }),
})

export const {
  useGetEuroCupEventQuery,
  useGetEligibleEuroCupTicketQuery,
  useLazyGetEligibleEuroCupTicketQuery,
  useSubmitEuroCupTicketMutation,
  useGetEventEuroCupLogServiceQuery,
  useGetSubmittedTeamQuery,
} = euroApi
