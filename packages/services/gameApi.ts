import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { GetGameUrlQueryArgs, GetGameUrlResult } from './gameApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const gameEndpoints = (builder: EndpointBuilderType) => {
  return {
    getGameUrl: builder.query<IResponse<GetGameUrlResult>, GetGameUrlQueryArgs>(
      {
        query: ({ game_code, is_demo, is_mobile, platform_code }) => ({
          url: `/player_api/gotogame`,
          data: {
            game_code,
            is_demo,
            is_mobile,
            platform_code,
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
export const { useGetGameUrlQuery, useLazyGetGameUrlQuery } = gameApi
