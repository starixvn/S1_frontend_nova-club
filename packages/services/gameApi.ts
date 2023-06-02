import { Currency } from 'app/utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  Game,
  GameConfig,
  GameListQueryArgs,
  GameScreenMultipleRequest,
  GetGameListQueryArgs,
  GetGameListResult,
  GetGameUrlQueryArgs,
  GetGameUrlResult,
} from './gameApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const gameApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    goToGame: builder.mutation<
      IResponse<GetGameUrlResult>,
      GetGameUrlQueryArgs
    >({
      query: ({ token, ...params }) => ({
        url: `/player_api/gotogame`,
        data: params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
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
    gameListMultiple: builder.query<Game[], GameScreenMultipleRequest>({
      async queryFn(_arg, _queryApi, _extraOptions, fetch) {
        try {
          const gcFilterResp = await fetch({
            url: '/static_api/getGameList',
            method: 'POST',
            data: {
              currency: Currency.VND,
              game_category: _arg.game_category,
              limit: 999,
              offset: 0,
            },
            _config: {
              isStaticApi: true,
            },
          })
          console.log('gcFilterResp', gcFilterResp)

          const gdcFilterResp = await fetch({
            url: '/static_api/getGameList',
            method: 'POST',
            data: {
              currency: Currency.VND,
              game_category: [],
              limit: 999,
              offset: 0,
              gdc_game_category: _arg.gdc_game_category,
            },
            _config: {
              isStaticApi: true,
            },
          })
          console.log('gdcFilterResp', gdcFilterResp)

          return {
            data: gdcFilterResp.data?.data?.rows.concat(
              gcFilterResp.data?.data?.rows
            ),
          }
        } catch (e) {
          console.log('error', e)
          return {
            error: {},
          }
        }
      },
    }),
  }),
})

export const {
  useGoToGameMutation,
  useFeaturedGameListQuery,
  useGameListMultipleQuery,
  useGameListQuery,
  useGetGameListQuery,
} = gameApi
