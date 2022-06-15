import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  GameListResult,
  GameQueryArgs,
  GetGameUrlQueryArgs,
  GetGameUrlResult,
} from './gameApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const gameEndpoints = (builder: EndpointBuilderType) => {
  return {
    gameList: builder.query<IResponse<GameListResult[]>, GameQueryArgs>({
      query: ({ platform, type }) => ({
        url: `/static_api/getGameListApi`,
        data: {
          platform,
          type,
        },
      }),
    }),
    getGameUrl: builder.query<IResponse<GetGameUrlResult>, GetGameUrlQueryArgs>(
      {
        query: ({
          game_code,
          is_demo,
          is_mobile,
          platform_code,
          username,
        }) => ({
          url: `/player_api/gotogame`,
          data: {
            game_code,
            is_demo,
            is_mobile,
            platform_code,
            username,
          },
        }),
      }
    ),
  }
}

/**
 * `endpoints` has to rewrite here for proper typescript inference
 */
const gameApi = createApi({
  reducerPath: 'game',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...gameEndpoints(builder),
  }),
})

export default gameApi
export { gameEndpoints }
export const { useGameListQuery, useGetGameUrlQuery } = gameApi
