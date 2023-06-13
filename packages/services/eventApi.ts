// https://world-cup-json-2022.fly.dev/matches
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  PredictionWinnerResult,
  TicketSpinBalance,
  TicketSpinResult,
  WcTicketCountResp,
} from './eventApi.type'

export const eventApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
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
    luckyDraw: builder.mutation<IResponse<TicketSpinResult>, void>({
      query: () => ({
        url: `/player_api/playerTicFreeWheelSpin`,
      }),
      invalidatesTags: ['TicketBalance'],
    }),
    CLTicketCount: builder.query<IResponse<WcTicketCountResp>, void>({
      query: () => ({
        url: `/player_api/getCLTicketCount`,
        method: 'POST',
      }),
      providesTags: ['PredictCount'],
    }),
    submitCLTicket: builder.mutation<IResponse<void>, string>({
      query: (teamScoring) => ({
        url: `/player_api/submitCLTicket`,
        method: 'POST',
        data: {
          team_code: teamScoring,
        },
      }),
      invalidatesTags: ['PredictCount'],
    }),
    predictionWinnerList: builder.query<
      IResponse<PredictionWinnerResult>,
      void
    >({
      query: () => ({
        url: `/static_api/getWinnerList`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
  useLuckyDrawMutation,
  useCLTicketCountQuery,
  useSubmitCLTicketMutation,
  usePredictionWinnerListQuery,
} = eventApi
