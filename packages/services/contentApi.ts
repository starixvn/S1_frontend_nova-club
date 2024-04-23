import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { ROOT_DOMAIN } from 'app/constants/domain'
import { baseApiWithTag } from './baseApi'
import { DefaultParams, EndpointBuilderType, IResponse } from './common/types'
import {
  AffiliateUsernameArgs,
  AnnouncementListItems,
  AnnouncementResult,
  BannerItem,
  BannerPage,
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  JackpotAmountResult,
  LeaderboardRankingResult,
  LeaderboardResult,
  RankingItem,
} from './contentApi.type'
import { Currency, DEFAULT_CURRENCY } from 'utils/constant'
import { createSelector } from '@reduxjs/toolkit'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const contentApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    banner: builder.query<BannerItem[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/bannerList/${currency}`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: BannerResult }) => {
        return data.rows.sort((a, b) => b.banner_seq - a.banner_seq) ?? []
      },
    }),
    slotBanner: builder.query<BannerResult[], void>({
      query: () => ({
        url: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/slot/banner_slot.json?v=1`,
        method: 'GET',
      }),
    }),
    slotBannerFull: builder.query<BannerResult[], void>({
      query: () => ({
        url: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/slot/banner_slot_full.json?v=1`,
        method: 'GET',
      }),
    }),
    getLeaderboard: builder.query<RankingItem[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getLeaderboard/${currency}`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: LeaderboardRankingResult }) => {
        return data.rows ?? []
      },
    }),
    commissionTable: builder.query<
      CommissionTableResult[],
      CommissionQueryArgs
    >({
      query: ({ currency }) => ({
        url: `/player_api/v1/getProviderAndGameTypeCommission`,
        data: {
          currency,
        },
      }),
      transformResponse: ({ data }: { data: CommissionTableResult[] }) => {
        const transformResponse =
          data?.slice(1).filter((item) => {
            return item.system_code === '' ||
              (item.cash_player > 0 &&
                item.cash_player_referrer > 0 &&
                item.cash_agent > 0)
              ? item
              : null
          }) ?? []
        return transformResponse ?? []
      },
    }),
    announcement: builder.query<AnnouncementListItems[], DefaultParams>({
      query: ({ locale, currency }) => ({
        url: `/static_api/v1/announcement/${currency}`,
        method: 'GET',
      }),
      transformResponse: (resp: IResponse<AnnouncementResult>) => {
        return resp.data?.list ?? []
      },
      providesTags: (result, error, arg) => {
        return [
          { type: 'Announcement', lang: arg.locale, currency: arg.currency },
        ]
      },
    }),
    affiliateUsername: builder.query<
      IResponse<{ username: string; currency: string }>,
      AffiliateUsernameArgs
    >({
      query: ({ trackingCode, currency = DEFAULT_CURRENCY }) => ({
        url: `/static_api/v1/referral/${trackingCode}/${currency}`,
        method: 'GET',
      }),
    }),
    getJackpotAmount: builder.query<IResponse<JackpotAmountResult>, void>({
      query: () => ({
        url: `/api/getJackpotValue`,
        method: 'GET',
        baseURL: ROOT_DOMAIN,
      }),
    }),
    getMaintenance: builder.query<IResponse<JackpotAmountResult>, void>({
      query: () => ({
        url: `/api/getMaintenance`,
        method: 'GET',
        baseURL: 'http://localhost:3000',
      }),
    }),
  }),
})

export const selectBannerByPage = createSelector(
  (banners: BannerItem[] | undefined) => banners,
  (banners: BannerItem[] | undefined, page: BannerPage) => page,
  (banners: BannerItem[] | undefined, page: BannerPage) =>
    banners?.filter((b) => b.banner_display_page === page) ?? []
)

export const {
  useBannerQuery,
  useSlotBannerQuery,
  useSlotBannerFullQuery,
  useGetLeaderboardQuery,
  useCommissionTableQuery,
  useAnnouncementQuery,
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
  useGetJackpotAmountQuery,
  useGetMaintenanceQuery,
} = contentApi
