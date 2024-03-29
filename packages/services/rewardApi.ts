import { Currency, DEFAULT_CURRENCY } from 'utils/constant'
import { baseApiWithTag } from './baseApi'
import { DefaultParams, EndpointBuilderType, IResponse } from './common/types'
import {
  ClaimChristmasEventCoinResult,
  ClaimEventCoinResult,
  Coin,
  CoinRedemptionList,
  DailyCoinSettingResult,
  EligibleEventCoin,
  EventCode,
  RedemptionResult,
} from './rewardApi.type'

export const rewardApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    getCoin: builder.query<number | undefined, void>({
      query: () => ({
        url: `/player_api/v1/getCoin`,
      }),
      transformResponse: (r: IResponse<{ balance: string }>) => {
        return Number(r.data?.balance) ?? undefined
      },
      providesTags: ['Coin'],
    }),
    redeemCoin: builder.mutation<IResponse<RedemptionResult>, string>({
      query: (secret_key) => ({
        url: `/player_api/v1/coinRedemption`,
        data: {
          secret_key,
        },
      }),
      invalidatesTags: ['Coin'],
    }),
    getCoinRedemptionList: builder.query<
      CoinRedemptionList['rows'],
      DefaultParams
    >({
      query: ({ currency = DEFAULT_CURRENCY }) => ({
        url: `/static_api/v1/getCoinRedemptionList/${currency}`,
        method: 'GET',
      }),
      transformResponse(r: IResponse<Pick<CoinRedemptionList, 'rows'>>) {
        return r.data?.rows?.sort((a, b) => a.seq - b.seq) || []
      },
    }),
    checkInDailyCoin: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/player_api/v1/checkInDailyCoin`,
      }),
      invalidatesTags: ['CheckInProgress', 'Coin'],
    }),
    getDailyCoin: builder.query<DailyCoinSettingResult, void>({
      query: () => ({
        url: `/player_api/v1/getDailyCoin`,
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
        url: `/player_api/v1/getEligibleEventCoin`,
      }),
    }),
    claimEventCoin: builder.mutation<IResponse<ClaimEventCoinResult>, string>({
      query: (event_code) => ({
        url: `/player_api/v1/claimEventCoin`,
        data: {
          event_code,
        },
      }),
      invalidatesTags: ['CheckInProgress', 'Coin'],
    }),
    getChristmasEventCoin: builder.query<string | undefined, void>({
      query: () => ({
        url: `/player_api/v1/getFCFSEligibleCoin`,
      }),
      transformResponse: ({ data }: { data: EventCode[] }) => {
        return data.length > 0 ? data[0]?.event_code : undefined
      },
    }),
    claimChristmasEventCoin: builder.mutation<
      IResponse<ClaimChristmasEventCoinResult>,
      string
    >({
      query: (event_code) => ({
        url: `/player_api/v1/claimFCFSCoin`,
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
  useGetEligibleEventCoinQuery,
  useLazyGetEligibleEventCoinQuery,
  useClaimEventCoinMutation,
  useGetChristmasEventCoinQuery,
  useClaimChristmasEventCoinMutation,
} = rewardApi
