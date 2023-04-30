import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AnnouncementResult,
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  GameConfig,
  GameListQueryArgs,
  GetGameListQueryArgs,
  GetGameListResult,
  JackpotAmountResult,
  LeaderboardResult,
  MatchResult,
} from './contentApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const contentApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    banner: builder.query<BannerResult[], void>({
      query: () => ({
        url: `${MEDIA_DOMAIN}${CONTENT_URI}/banners/banner.json?v=13`,
        method: 'GET',
      }),
    }),
    leaderboard: builder.query<IResponse<LeaderboardResult[]>, void>({
      query: () => ({
        url: `/static_api/leaderboard`,
        method: 'GET',
      }),
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
    gameList: builder.query<IResponse<GameConfig[]>, GameListQueryArgs>({
      query: (data) => ({
        url: `/player_api/getGameList`,
        data,
      }),
    }),
    getGameList: builder.query<
      IResponse<GetGameListResult>,
      GetGameListQueryArgs
    >({
      query: ({
        currency,
        game_category,
        limit,
        offset,
        gdc_game_category,
        gdc_tag,
      }) => ({
        url: `/static_api/getGameList`,
        method: 'POST',
        data: {
          currency,
          game_category,
          limit,
          offset,
          gdc_game_category,
          gdc_tag,
        },
        _config: {
          isStaticApi: true,
        },
      }),
    }),
    featuredGameList: builder.query<IResponse<GetGameListResult>, string>({
      query: (data) => ({
        url: `/static_api/getFeaturedGameList`,
        data,
      }),
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
    getRecoMatch: builder.query<IResponse<MatchResult[]>, void>({
      query: () => ({
        url: `/static_api/getRecoMatch`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useBannerQuery,
  useLeaderboardQuery,
  useCommissionTableQuery,
  useAnnouncementQuery,
  useGameListQuery,
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
  useGetGameListQuery,
  useLazyGetGameListQuery,
  useFeaturedGameListQuery,
  useGetJackpotAmountQuery,
  useGetRecoMatchQuery,
} = contentApi
