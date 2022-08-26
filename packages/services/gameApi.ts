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
        query: ({ token, ...params }) => ({
          url: `/player_api/gotogame`,
          data: params,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
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
