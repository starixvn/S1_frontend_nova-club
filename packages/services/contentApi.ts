import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AnnouncementResult,
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  JackpotAmountResult,
  LeaderboardRankingResult,
  LeaderboardResult,
  RankingItem,
} from './contentApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const contentApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    banner: builder.query<BannerResult[], void>({
      query: () => ({
        url: `${MEDIA_DOMAIN}${CONTENT_URI}/banners/banner.json?v=1`,
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
      IResponse<CommissionTableResult[]>,
      CommissionQueryArgs
    >({
      query: ({ currency }) => ({
        url: `/player_api/getProviderAndGameTypeCommission`,
        data: {
          currency,
        },
      }),
    }),
    announcement: builder.query<IResponse<AnnouncementResult>, string>({
      query: (lang) => ({
        url: `/static_api/announcement`,
        method: 'GET',
      }),
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
  useLeaderboardQuery,
  useGetLeaderboardQuery,
  useCommissionTableQuery,
  useAnnouncementQuery,
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
  useGetJackpotAmountQuery,
} = contentApi
