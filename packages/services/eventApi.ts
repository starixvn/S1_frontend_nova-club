// https://world-cup-json-2022.fly.dev/matches
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { WcTicketCountResp } from './eventApi.type'

export const eventApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    wcTicketCount: builder.query<IResponse<WcTicketCountResp>, void>({
      query: () => ({
        url: `/player_api/getWcTicketCount`,
        method: 'POST',
      }),
      providesTags: ['PredictCount'],
    }),
    wcPredict: builder.mutation<IResponse<void>, string>({
      query: (teamId) => ({
        url: `/player_api/submitWcTicket`,
        method: 'POST',
        data: {
          team_code: teamId,
        },
      }),
      invalidatesTags: ['PredictCount'],
    }),
  }),
})

export const { useWcTicketCountQuery, useWcPredictMutation } = eventApi
