// https://world-cup-json-2022.fly.dev/matches
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AffCupWinnerList,
  CNYRollResult,
  CNYSpinBalance,
  TicketSpinBalance,
  TicketSpinResult,
  WcTicketCountResp,
} from './eventApi.type'

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
    affcupWinnerList: builder.query<IResponse<AffCupWinnerList>, void>({
      query: () => ({
        url: `/static_api/getWinnerList`,
        method: 'GET',
      }),
    }),
    checkCnySpin: builder.query<IResponse<CNYSpinBalance>, void>({
      query: () => ({
        url: `/player_api/checkCnyElegibleSpin`,
      }),
      providesTags: ['CNYSpinBalance'],
    }),
    cnySpin: builder.mutation<IResponse<CNYRollResult[]>, void>({
      query: () => ({
        url: `/player_api/cnyFreeWheelSpin`,
      }),
      invalidatesTags: ['CNYSpinBalance'],
    }),
    checkTicketSpin: builder.query<IResponse<TicketSpinBalance>, void>({
      query: () => ({
        url: `/player_api/checkPlayerTicEligibleSpin`,
      }),
      providesTags: ['TicketBalance'],
    }),
    ticketSpin: builder.mutation<IResponse<TicketSpinResult[]>, void>({
      query: () => ({
        url: `/player_api/playerTicFreeWheelSpin`,
      }),
      invalidatesTags: ['TicketBalance'],
    }),
  }),
})

export const {
  useWcTicketCountQuery,
  useWcPredictMutation,
  useAffcupWinnerListQuery,
  useCheckCnySpinQuery,
  useCnySpinMutation,
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
} = eventApi
