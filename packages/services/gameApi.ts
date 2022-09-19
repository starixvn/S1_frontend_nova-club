import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { GetGameUrlQueryArgs, GetGameUrlResult } from './gameApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const gameApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    getGameUrl: builder.query<IResponse<GetGameUrlResult>, GetGameUrlQueryArgs>(
      {
        query: ({ token, ...params }) => ({
          url: `/player_api/gotogame`,
          data: params,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
      }
    ),
  }),
})

export const { useGetGameUrlQuery, useLazyGetGameUrlQuery } = gameApi
