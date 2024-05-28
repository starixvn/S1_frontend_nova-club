// https://world-cup-json-2022.fly.dev/matches
import { Currency, DEFAULT_CURRENCY } from 'utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  MysteryCheckResult,
  MysteryClaimArgs,
  MysteryEventPrize,
  MysteryEventResult,
  MysteryWinner,
  MysteryWinnerResult,
  TicketSpinBalance,
  TicketSpinResult,
} from './eventApi.type'

export const eventApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    checkTicketSpin: builder.query<IResponse<TicketSpinBalance>, void>({
      query: () => ({
        url: `/player_api/v1/checkPlayerTicEligibleSpin`,
      }),
      providesTags: ['TicketBalance'],
    }),
    ticketSpin: builder.mutation<IResponse<TicketSpinResult[]>, void>({
      query: () => ({
        url: `/player_api/v1/playerTicFreeWheelSpin`,
      }),
      invalidatesTags: ['TicketBalance'],
    }),
    luckyDraw: builder.mutation<IResponse<TicketSpinResult>, void>({
      query: () => ({
        url: `/player_api/v1/playerTicFreeWheelSpin`,
      }),
      invalidatesTags: ['TicketBalance'],
    }),
    getMysteryEvent: builder.query<MysteryEventPrize[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getMysteryEvent`,
      }),
      transformResponse: ({ data }: { data: MysteryEventResult }) => {
        return data?.prize ?? []
      },
    }),
    getMysteryCheck: builder.query<IResponse<MysteryCheckResult>, void>({
      query: () => ({
        url: `/player_api/v1/getMysteryCheck`,
      }),
    }),
    setMysteryClaim: builder.mutation<IResponse<void>, MysteryClaimArgs>({
      query: (queryArgs) => ({
        url: `/player_api/v1/setMysteryClaim`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    getMysteryWinner: builder.query<MysteryWinner[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getMysteryWinner`,
      }),
      transformResponse: ({ data }: { data: MysteryWinnerResult }) => {
        return data?.list ?? []
      },
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
