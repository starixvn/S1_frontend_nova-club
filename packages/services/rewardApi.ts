import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  ClaimEventCoinResult,
  Coin,
  CoinRedemptionList,
  DailyCoinSettingResult,
  EligibleEventCoin,
  RedemptionResult,
} from './rewardApi.type'

export const rewardApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    getCoin: builder.query<number | undefined, void>({
      query: () => ({
        url: `/player_api/getCoin`,
      }),
      transformResponse: (r: IResponse<{ balance: string }>) => {
        return Number(r.data?.balance) ?? undefined
      },
      providesTags: ['Coin'],
    }),
    redeemCoin: builder.mutation<IResponse<RedemptionResult>, string>({
      query: (secret_key) => ({
        url: `/player_api/coinRedemption`,
        data: {
          secret_key,
        },
      }),
      invalidatesTags: ['Coin'],
    }),
    getCoinRedemptionList: builder.query<CoinRedemptionList['rows'], void>({
      query: () => ({
        url: `/static_api/getCoinRedemptionList`,
        method: 'GET',
      }),
      transformResponse(r: IResponse<Pick<CoinRedemptionList, 'rows'>>) {
        return r.data?.rows?.sort((a, b) => a.seq - b.seq) || []
      },
    }),
    checkInDailyCoin: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/player_api/checkInDailyCoin`,
      }),
      invalidatesTags: ['CheckInProgress', 'Coin'],
    }),
    getDailyCoin: builder.query<DailyCoinSettingResult, void>({
      query: () => ({
        url: `/player_api/getDailyCoin`,
      }),
      providesTags: ['CheckInProgress'],
      transformResponse(r: IResponse<DailyCoinSettingResult>) {
        const stringifySetting = r.data?.daily_setting as unknown as string
        const parsedSetting = stringifySetting
          ? (JSON.parse(stringifySetting) as Coin[])
          : []

        return {
          daily_setting: parsedSetting,
          current_daily_setting: r.data?.current_daily_setting || '',
          day: r.data?.day || 0,
          checked_in: r.data?.checked_in || false,
        }
      },
    }),
    getEligibleEventCoin: builder.query<IResponse<EligibleEventCoin>, void>({
      query: () => ({
        url: `/player_api/getEligibleEventCoin`,
      }),
    }),
    claimEventCoin: builder.mutation<IResponse<ClaimEventCoinResult>, string>({
      query: (event_code) => ({
        url: `/player_api/claimEventCoin`,
        data: {
          event_code,
        },
      }),
      invalidatesTags: ['CheckInProgress', 'Coin'],
    }),
  }),
})

export const {
  useGetCoinQuery,
  useRedeemCoinMutation,
  useGetCoinRedemptionListQuery,
  useCheckInDailyCoinMutation,
  useGetDailyCoinQuery,
  useLazyGetEligibleEventCoinQuery,
  useClaimEventCoinMutation,
} = rewardApi
