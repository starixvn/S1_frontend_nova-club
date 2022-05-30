import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { GameListResult, GameQueryArgs } from './gameApi.type'

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
export const { useGameListQuery } = gameApi
