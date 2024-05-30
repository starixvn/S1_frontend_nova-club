import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  EligibleEuroCupTicketArgs,
  EligibleEuroCupTicketResult,
  EuroCupEvent,
  EuroCupKnockout,
  EuroCupSportBookList,
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
        url: `/static_api/v1/getEuroCupEvent`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: EuroCupEvent }) => {
        return data ?? []
      },
    }),
    getEuroCupKnockout: builder.query<EuroCupKnockout[], void>({
      query: () => ({
        url: `/static_api/v1/getEuroCupKnockout`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: EuroCupKnockout[] }) => {
        return data ?? []
      },
    }),
    getEuroCupSportBookList: builder.query<EuroCupSportBookList[], void>({
      query: () => ({
        url: `/static_api/v1/getEuroCupSportBookList`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: EuroCupSportBookList[] }) => {
        return data ?? []
      },
    }),
    getEligibleEuroCupTicket: builder.query<
      IResponse<EligibleEuroCupTicketResult>,
      EligibleEuroCupTicketArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getEligibleEurocupTicket`,
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
        url: `/player_api/v1/submitEligibleEurocupTicket`,
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
        url: `/player_api/v1/getEventEuroCupLogService`,
        method: 'POST',
      }),
    }),
    getSubmittedTeam: builder.query<
      IResponse<GetSubmittedTeamResult>,
      GetSubmittedTeamArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getSubmittedTeam`,
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
  useGetEuroCupKnockoutQuery,
  useGetEuroCupSportBookListQuery,
} = euroApi
