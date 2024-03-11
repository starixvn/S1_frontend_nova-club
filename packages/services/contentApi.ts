import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AnnouncementListItems,
  AnnouncementResult,
  BannerItem,
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  JackpotAmountResult,
  LeaderboardRankingResult,
  LeaderboardResult,
  RankingItem,
} from './contentApi.type'
import { Currency } from 'utils/constant'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const contentApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    banner: builder.query<BannerItem[], { currency: Currency }>({
      query: ({ currency }) => ({
        url: `/static_api/bannerList/${currency ?? Currency.VND}`,
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
    leaderboard: builder.query<IResponse<LeaderboardResult[]>, void>({
      query: () => ({
        url: `/static_api/leaderboard`,
        method: 'GET',
      }),
    }),
    getLeaderboard: builder.query<RankingItem[], void>({
      query: () => ({
        url: `/static_api/getLeaderboard`,
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
        url: `/player_api/getProviderAndGameTypeCommission`,
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
    announcement: builder.query<AnnouncementListItems[], string>({
      query: (lang) => ({
        url: `/static_api/announcement`,
        method: 'GET',
      }),
      transformResponse: (resp: IResponse<AnnouncementResult>) => {
        return resp.data?.list ?? []
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'Announcement', lang: arg }]
      },
    }),
    affiliateUsername: builder.query<
      IResponse<{ username: string; currency: string }>,
      string
    >({
      query: (trackingCode) => ({
        url: `/static_api/referral/${trackingCode}`,
        method: 'GET',
      }),
    }),
    getJackpotAmount: builder.query<IResponse<JackpotAmountResult>, void>({
      query: () => ({
        url: `/api/getJackpotValue`,
        method: 'GET',
        baseURL: DEV_DOMAIN,
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

export const {
  useBannerQuery,
  useSlotBannerQuery,
  useSlotBannerFullQuery,
  useLeaderboardQuery,
  useGetLeaderboardQuery,
  useCommissionTableQuery,
  useAnnouncementQuery,
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
  useGetJackpotAmountQuery,
  useGetMaintenanceQuery,
} = contentApi
