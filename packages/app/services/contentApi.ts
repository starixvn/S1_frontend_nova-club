import { createApi } from '@reduxjs/toolkit/query/react'
import { LANGUAGE_CODE } from 'app/constant/language'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  BannerResult,
  CommissionQueryArgs,
  CommissionTableResult,
  LeaderboardResult,
} from './contentApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const contentEndpoints = (builder: EndpointBuilderType) => {
  return {
    banner: builder.query<IResponse<BannerResult[]>, LANGUAGE_CODE>({
      query: (languageCode) => ({
        url: `/static_api/banner/${languageCode}`,
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
export const { useBannerQuery, useLeaderboardQuery, useCommissionTableQuery } =
  contentApi
