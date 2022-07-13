import { createApi } from '@reduxjs/toolkit/query/react'
import { LANGUAGE_CODE } from 'app/constant/language'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  AnnouncementResult,
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  GameConfig,
  GameListQueryArgs,
  LeaderboardResult,
} from './contentApi.type'
import { MEDIA_DOMAIN } from '@env'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const contentEndpoints = (builder: EndpointBuilderType) => {
  return {
    banner: builder.query<IResponse<BannerResult[]>, void>({
      query: () => ({
        url: `${MEDIA_DOMAIN}/nvclub/nova-club/content/banners/banner.json`,
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
    announcement: builder.query<IResponse<AnnouncementResult>, void>({
      query: () => ({
        url: `/static_api/announcement`,
        method: 'GET',
      }),
    }),
    gameList: builder.query<IResponse<GameConfig[]>, GameListQueryArgs>({
      query: (data) => ({
        url: `/player_api/getGameList`,
        data,
      }),
    }),
    affiliateUsername: builder.query<IResponse<{ username: string }>, string>({
      query: (trackingCode) => ({
        url: `/static_api/referral/${trackingCode}`,
        method: 'GET',
      }),
    }),
  }
}

/**
 * `endpoints` has to rewrite here for proper typescript inference
 */
const contentApi = createApi({
  reducerPath: 'content',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...contentEndpoints(builder),
  }),
})

export default contentApi
export { contentEndpoints }
export const {
  useBannerQuery,
  useLeaderboardQuery,
  useCommissionTableQuery,
  useAnnouncementQuery,
  useGameListQuery,
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
} = contentApi
