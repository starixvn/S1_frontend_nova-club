// https://world-cup-json-2022.fly.dev/matches
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  MysteryCheckResult,
  MysteryClaimArgs,
  MysteryEventPrize,
  MysteryEventResult,
  TicketSpinBalance,
  TicketSpinResult,
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
    getMysteryEvent: builder.query<MysteryEventPrize[], void>({
      query: () => ({
        url: `/player_api/getMysteryEvent`,
      }),
      transformResponse: ({ data }: { data: MysteryEventResult }) => {
        return data?.prize ?? []
      },
    }),
    getMysteryCheck: builder.query<IResponse<MysteryCheckResult>, void>({
      query: () => ({
        url: `/player_api/getMysteryCheck`,
      }),
    }),
    setMysteryClaim: builder.mutation<IResponse<void>, MysteryClaimArgs>({
      query: (queryArgs) => ({
        url: `/player_api/setMysteryClaim`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    getMysteryWinner: builder.query<IResponse<TicketSpinBalance>, void>({
      query: () => ({
        url: `/player_api/getMysteryWinner`,
      }),
    }),
  }),
})

export const {
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
  useLuckyDrawMutation,
  useGetMysteryEventQuery,
  useGetMysteryCheckQuery,
  useGetMysteryWinnerQuery,
  useSetMysteryClaimMutation,
} = eventApi
